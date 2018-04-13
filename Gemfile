source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby "2.4.2"

gem "rails", "~> 5.1.4"

gem "activeadmin"

gem "coffee-rails", "~> 4.2"
gem "devise"

gem "mailgun-ruby"
# TODO: bump this to ~> 1.0.0, once this gets resolved: https://github.com/rails/rails/pull/31671
gem "pg", "~> 0.21.0"
gem "puma", "~> 3.7"
gem "sass-rails", "~> 5.0"
gem "taperole", "~> 2.0"
gem "uglifier", ">= 1.3.0"

group :development, :test do
  gem "annotate"
  gem "awesome_print"
  gem "brakeman", "~> 3.5"
  gem "bundler-audit"
  gem "codeclimate-test-reporter", "~> 1.0.0"
  gem "database_cleaner"
  gem "factory_bot_rails"
  gem "faker"
  gem "pry-byebug"
  gem "rails-erd"
  gem "rspec-rails"
  gem "rubocop"
  gem "rubocop-rspec"
  gem "shoulda-matchers"
  gem "simplecov"
end

group :development do
  gem "letter_opener"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "web-console", ">= 3.3.0"
end
