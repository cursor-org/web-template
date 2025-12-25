# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = Settings.sentry.dsn
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]
end
