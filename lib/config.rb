# frozen_string_literal: true

require_relative "config/options"
require_relative "config/sources/yaml_source"
require_relative "config/sources/env_source"

module Config
  class << self
    def load_and_set_settings
      Object.const_set(:Settings, load_files!)
    end

    private

    def load_files!
      config = Options.new

      setting_sources.each do |source|
        config.add_source!(source)
      end

      config.load!
      config
    end

    def setting_sources
      [
        *(yaml_source_files.map { |f| Sources::YamlSource.new(f) }),
        Sources::EnvSource.new,
      ]
    end

    def yaml_source_files
      config_root = ::Rails.root.join("config")
      env = ::Rails.env

      [
        File.join(config_root, "settings.yml").to_s,
        File.join(config_root, "settings", "#{env}.yml").to_s,
        (File.join(config_root, "settings.local.yml").to_s if env != "test"),
      ].compact
    end
  end
end

require_relative("config/integrations/rails/railtie")
