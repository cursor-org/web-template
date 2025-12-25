# frozen_string_literal: true

module Localized
  extend ActiveSupport::Concern

  included do
    before_action :redirect_to_fallback_locale!, if: -> { params[:locale].blank? }, unless: -> { request.path == "/" }
    before_action :set_locale!
  end

  private

  def redirect_to_fallback_locale!
    redirect_to url_for(locale: fallback_locale, **params.permit!), status: :moved_permanently
  end

  def fallback_locale
    locale_from_header || I18n.default_locale
  end

  def set_locale!
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def locale_from_header
    @locale_from_header ||= begin
      locale = request.env.fetch("HTTP_ACCEPT_LANGUAGE", "").scan(/^[a-z]{2}/).first

      locale && I18n.available_locales.include?(locale.to_sym) ? locale : nil
    end
  end

  # def set_localized_meta(locale_path, **translation_attrs)
  #   title = I18n.t("#{locale_path}.title", default: nil, **translation_attrs)
  #   description = I18n.t("#{locale_path}.description", default: nil, **translation_attrs)
  #   keywords = I18n.t("#{locale_path}.keywords", default: nil, **translation_attrs)
  #
  #   set_meta(title:) if title
  #   set_meta(description:) if description
  #   set_meta(keywords:) if keywords
  # end
  #
  # def set_localized_meta_by_action
  #   set_localized_meta("meta.#{controller_name}.#{action_name}")
  # end
end
