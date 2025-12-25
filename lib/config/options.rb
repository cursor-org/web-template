# frozen_string_literal: true

require "ostruct"

module Config
  class Options < OpenStruct
    def add_source!(source)
      @config_sources ||= []
      @config_sources << source
    end

    # look through all our sources and rebuild the configuration
    def load!
      conf = {}
      @config_sources.each do |source|
        source_conf = source.load

        if conf.empty?
          conf = source_conf
        else
          DeepMerge.deep_merge!(
            source_conf,
            conf,
            preserve_unmergeables: false,
            overwrite_arrays: true,
            merge_nil_values: true,
            merge_hash_arrays: false,
          )
        end
      end

      # swap out the contents of the OStruct with a hash (need to recursively convert)
      marshal_load(__convert(conf).marshal_dump)

      self
    end

    def to_h
      result = {}
      marshal_dump.each do |k, v|
        result[k] = if v.instance_of? Config::Options
          v.to_h
        elsif v.instance_of? Array
          descend_array(v)
        else
          v
        end
      end
      result
    end

    def method_missing(method_name, *args) # rubocop:disable Style/MissingRespondToMissing
      raise KeyError, "key not found: #{method_name.inspect}" if method_name !~ /.*(?==\z)/m && !@table.key?(method_name)

      super
    end

    protected

    def descend_array(array)
      array.map do |value|
        if value.instance_of? Config::Options
          value.to_h
        elsif value.instance_of? Array
          descend_array(value)
        else
          value
        end
      end
    end

    # Recursively converts Hashes to Options (including Hashes inside Arrays)
    def __convert(h) # rubocop:disable Naming/MethodParameterName
      s = self.class.new

      h.each do |k, v|
        k = k.to_s if !k.respond_to?(:to_sym) && k.respond_to?(:to_s)

        case v
        when Hash
          v = __convert(v)
        when Array
          v = v.collect { |e| e.instance_of?(Hash) ? __convert(e) : e }
        end

        s[k] = v
      end
      s
    end
  end
end
