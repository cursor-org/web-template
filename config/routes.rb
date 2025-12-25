# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, only: :omniauth_callbacks, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}

  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    root to: "landing#home"
  end

  get "*fallback", to: "application#fallback"
end
