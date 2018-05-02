require "rails_helper"

RSpec.describe TimeEntry, type: :model do
  it { is_expected.to respond_to(:date) }
  it { is_expected.to respond_to(:hours) }

  it { is_expected.to belong_to(:time_entry_set) }
end
