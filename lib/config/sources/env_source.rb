# frozen_string_literal: true

module Config
  module Sources
    # Allows settings to be loaded from a "flat" hash with string keys, like ENV.
    class EnvSource
      attr_reader :prefix, :separator

      def initialize(env = ENV)
        @env = env
        @prefix = "SETTINGS"
        @separator = "__"
      end

      def load
        hash = {}

        @env.each do |variable, value|
          keys = variable.to_s.split(separator)

          next if keys.shift != prefix

          keys.map!(&:downcase)

          leaf = keys[0...-1].inject(hash) do |h, key|
            h[key] ||= {}
          end

          unless leaf.is_a?(Hash)
            conflicting_key = (prefix + keys[0...-1]).join(separator)
            raise "Environment variable #{variable} conflicts with variable #{conflicting_key}"
          end

          leaf[keys.last] = parse_value(value)
        end

        hash
      end

      private

      # Try to convert string to a correct type
      def parse_value(v) # rubocop:disable Naming/MethodParameterName
        case v
        when "false"
          false
        when "true"
          true
        else
          begin
            begin
              Integer(v)
            rescue
              Float(v)
            end
          rescue
            v
          end
        end
      end
    end
  end
end
