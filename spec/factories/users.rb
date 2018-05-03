FactoryBot.define do
  factory :user do |f|
    f.sequence(:email) { |n| "user_#{n}@example.com" }
    password "password"
    password_confirmation "password"
    active true
  end
end
