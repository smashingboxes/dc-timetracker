FactoryBot.define do
  factory :time_entry do
    date { Time.zone.now }
    # 0.5, 1.0, ..., 7.5, 8.0
    hours { (1..16).to_a.map { |i| i * 0.5 } }
  end
end
