# frozen_string_literal: true

module ExceptionRenders
  extend ActiveSupport::Concern

  included do
    if !Rails.env.development? && !Rails.env.test?
      rescue_from Exception, with: :render_internal_server_error
    end

    rescue_from ActionController::RoutingError, with: :render_not_found
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from KeyError, with: :render_not_found
  end

  private

  def render_not_found
    respond_to do |format|
      format.html do
        set_meta(
          title: "404 - Page Not Found",
          error: true,
          robots: "noindex",
        )

        render_inertia("Errors/NotFound", status: 404)
      end
      format.json { render json: {error: "Not found"}, status: :not_found }
    end
  end

  def render_internal_server_error(exception)
    Sentry.capture_exception(exception)

    respond_to do |format|
      format.html do
        set_meta(
          title: "500 - Internal Server Error",
          error: true,
        )
        render_inertia("Errors/InternalServerError", status: 500)
      end
      format.json do
        render json: {error: "Internal server error"}, status: :internal_server_error
      end
    end
  end
end
