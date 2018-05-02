FactoryBot.define do
  factory :time_entry_set do
    description { Faker::Lorem.sentence }
    charge_code { Array.new(6) { (("A".."Z").to_a + (1..9).to_a).sample.to_s }.join }
    user
  end
end
