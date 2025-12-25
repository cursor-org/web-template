# frozen_string_literal: true

InertiaRails.configure do |config|
  config.ssr_enabled = ViteRuby.config.ssr_build_enabled
  config.default_render = false
  config.ssr_url = Settings.inertia.ssr_url
  config.deep_merge_shared_data = false
end

# We are not using shared_props
module InertiaRails
  class Renderer
    def computed_props
      @props
    end
  end
end
