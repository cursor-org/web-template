# frozen_string_literal: true

module Config
  module Integrations
    module Rails
      class Railtie < ::Rails::Railtie
        config.before_configuration { Config.load_and_set_settings }
      end
    end
  end
end
