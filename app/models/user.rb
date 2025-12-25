# frozen_string_literal: true

class User < ApplicationRecord
  include StrongId

  PASSWORD_POLICY_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{#{Devise.password_length.min},#{Devise.password_length.max}}$/

  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable,
    :confirmable,
    :timeoutable,
    :trackable,
    :omniauthable,
    omniauth_providers: [:google_oauth2]

  validate :password_complexity

  def admin?
    is_admin
  end

  def composite_id
    "User:#{id}"
  end

  def name
    @name ||= full_name.split(" ").first
  end

  def password_complexity
    return if password.blank? || password =~ PASSWORD_POLICY_REGEXP

    errors.add :password, "should include an uppercase letter, a lowercase letter, a digit or a special character"
  end
end
