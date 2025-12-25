release: bundle exec rails db:migrate
web: bin/vite ssr & bundle exec rails server
workers: bundle exec sidekiq -C config/sidekiq/${RACK_ENV:-development}.yml & bundle exec sidekiq -q crawls & wait
