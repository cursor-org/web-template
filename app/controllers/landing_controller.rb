# frozen_string_literal: true

class LandingController < ApplicationController
  include Localized

  # before_action :set_localized_meta_by_action
  # after_action :verify_meta_set

  def home
    set_meta(canonical: url_for(**params.permit!, locale: nil)) if I18n.locale == I18n.default_locale

    render_inertia("Landing/Home")
  end
end
