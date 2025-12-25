# frozen_string_literal: true

OmniAuth::Strategies::GoogleOauth2.class_eval do
  def request_phase
    if request.params["redirectTo"].present?
      session["user_return_to"] = request.params["redirectTo"]
    end
    super
  end
end
