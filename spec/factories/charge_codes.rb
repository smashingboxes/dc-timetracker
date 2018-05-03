FactoryBot.define do
  factory :charge_code do
    code { Faker::Lorem.word }
    name { Faker::Lorem.word }
  end
end
