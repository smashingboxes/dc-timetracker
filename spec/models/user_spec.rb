require "rails_helper"

RSpec.describe User, type: :model do
  it { is_expected.to respond_to(:email) }

  it { is_expected.to have_many(:timesheets) }
  it { is_expected.to have_many(:time_entry_sets) }
  it { is_expected.to have_many(:time_entries) }
  it { is_expected.to have_many(:charge_codes) }
end
