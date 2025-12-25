# frozen_string_literal: true

source "https://rubygems.org"

ruby "3.2.2"

gem "bootsnap", require: false # Reduces boot times through caching; required in config/boot.rb
gem "deep_merge", "~> 1.2", ">= 1.2.2", require: "deep_merge/core"
gem "devise", "~> 4.9"
gem "gon", "~> 6.4"
gem "inertia_rails", "~> 3.2"
gem "judoscale-rails", "~> 1.8"
gem "judoscale-sidekiq", "~> 1.8"
gem "money-rails", "~> 1.15"
gem "oj"
gem "omniauth-google-oauth2", "~> 1.2", ">= 1.2.1"
gem "omniauth-rails_csrf_protection", "~> 1.0", ">= 1.0.2"
gem "paper_trail", "~> 16.0"
gem "pg", "~> 1.1"
gem "puma", ">= 5.0"
gem "rack-canonical-host", "~> 1.3"
gem "rack-cors", "~> 2.0", ">= 2.0.2"
gem "rails", "~> 7.1.3", ">= 7.1.3.4"
gem "sentry-rails", "~> 5.22", ">= 5.22.1"
gem "sidekiq", "~> 7.3"
gem "sidekiq-scheduler", "~> 5.0"
gem "tzinfo-data", platforms: %i[windows jruby] # Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "vite_rails", "~> 3.0", ">= 3.0.17"

group :development, :test do
  gem "capybara", "~> 3.40", require: false
  gem "db-query-matchers", "~> 0.13.0"
  gem "factory_bot_rails", "~> 6.4", ">= 6.4.3"
  gem "foreman", "~> 0.88.1"
  gem "neatjson"
  gem "pry-byebug"
  gem "rspec"
  gem "rspec-rails"
  gem "rubocop", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", "~> 2.8", require: false
  gem "rubocop-thread_safety", "~> 0.5.1", require: false
  gem "selenium-webdriver", "~> 4.28", require: false
end

group :development do
  gem "derailed_benchmarks"
  gem "stackprof"
end
