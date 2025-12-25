# frozen_string_literal: true

require "yaml"
require "erb"

module Config
  module Sources
    class YamlSource
      attr_accessor :path

      def initialize(path)
        @path = path.to_s
      end

      # returns a config hash from the YML file
      def load
        if @path && File.exist?(@path)
          file_contents = File.read(@path)
          file_contents = ERB.new(file_contents).result
          result = YAML.unsafe_load(file_contents)
        end

        result || {}
      rescue Psych::SyntaxError => e
        raise "YAML syntax error occurred while parsing #{@path}. " \
              "Please note that YAML must be consistently indented using spaces. Tabs are not allowed. " \
              "Error: #{e.message}"
      end
    end
  end
end
