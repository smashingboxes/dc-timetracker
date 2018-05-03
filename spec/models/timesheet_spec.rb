require "rails_helper"

RSpec.describe Timesheet, type: :model do
  it { is_expected.to respond_to(:period_start) }

  it { is_expected.to belong_to(:user) }

  it { is_expected.to have_many(:time_entry_sets) }
  it { is_expected.to have_many(:time_entries) }
end
