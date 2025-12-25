# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ExceptionRenders

  attr_accessor :meta

  before_action :set_sentry_context
  before_action :set_paper_trail_whodunnit
  before_action :set_js_variables
  after_action :set_csrf_cookie

  def fallback
    render_not_found
  end

  private

  def set_csrf_cookie
    cookies["CSRF-TOKEN"] = form_authenticity_token
  end

  def render_inertia(component, props = {})
    # Rails.logger.info "  Rendering Inertia: #{component}"

    status = props.delete(:status) || 200

    render inertia: component, status:, props: {
      "ui-theme" => cookies.fetch("ui-theme", "system"),
      "locale" => I18n.locale,
      "origin" => request.base_url,
      "meta" => {
        canonical: url_for(locale: I18n.locale, **params.permit!),
        title: params[:action].titleize,
        error: false,
        **(meta || {}),
      },
    }.merge(props)
  end

  def set_sentry_context
    return unless Sentry.initialized?

    Sentry.set_user(id: current_user&.id) # or anything else in session
    Sentry.set_extras(params: params.to_unsafe_h, url: request.url)
  end

  def set_js_variables
    gon.push(
      clarityProjectId: Settings.clarity.project_id,
    )
  end

  def verify_meta_set
    return unless response.successful?

    if meta.nil? || meta[:description].blank?
      msg = "Meta not set"
      raise msg if Rails.env.development?

      Sentry.capture_message(msg, level: :warn, extra: {action: params[:action]})
    end
  end

  def set_meta(**attrs)
    self.meta ||= {}
    self.meta.merge!(attrs)
  end

  def authenticate_user!
    unless signed_in?
      session["user_return_to"] = user_return_to

      redirect_to app_login_path(locale: I18n.locale)
    end
  end

  def user_return_to
    request.fullpath
  end
end
