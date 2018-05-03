require "rails_helper"

RSpec.describe ChargeCode, type: :model do
  it { is_expected.to respond_to(:code) }
  it { is_expected.to respond_to(:name) }

  it { is_expected.to validate_presence_of(:code)}
  it { is_expected.to validate_presence_of(:name)}
end
