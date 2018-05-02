FactoryBot.define do
  factory :user do |f|
    f.sequence(:email) { |n| "user_#{n}@example.com" }
  end
end
