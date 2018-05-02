require "rails_helper"

RSpec.describe TimeEntrySet, type: :model do
  it { is_expected.to respond_to(:description) }
  it { is_expected.to respond_to(:charge_code) }
end
