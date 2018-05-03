require "rails_helper"

RSpec.describe TimeEntrySet, type: :model do
  it { is_expected.to respond_to(:description) }
  it { is_expected.to respond_to(:charge_code) }

  it { is_expected.to belong_to(:timesheet) }
  it { is_expected.to belong_to(:charge_code) }

  it { is_expected.to have_many(:time_entries) }
end
