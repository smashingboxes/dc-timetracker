require "rails_helper"

RSpec.describe UserChargeCode, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:charge_code) }
end
