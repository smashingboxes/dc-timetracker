require "rails_helper"

RSpec.describe TimeEntry, type: :model do
  it { is_expected.to respond_to(:start_time) }
  it { is_expected.to respond_to(:end_time) }
  it { is_expected.to respond_to(:description) }

  it { is_expected.to belong_to(:user) }
end
