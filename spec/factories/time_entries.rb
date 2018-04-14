FactoryBot.define do
  factory :time_entry do
    user
    start_time { Faker::Time.between(1.year.ago, 1.hour.ago, :day) }
    end_time { start_time + 1.hour }
    description { Faker::Lorem.sentence }
  end
end
