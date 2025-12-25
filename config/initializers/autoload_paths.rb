# frozen_string_literal: true

module Actions
end

module Notifications
end

[
  ["app/actions", ::Actions],
  ["app/notifications", ::Notifications],
].each do |auto|
  path = Rails.root.join(auto.first).to_s

  ActiveSupport::Dependencies.autoload_paths.delete(path)
  Rails.autoloaders.main.push_dir(path, namespace: auto.second)
end

Rails.autoloaders.main.push_dir(Rails.root.join("lib").to_s)
