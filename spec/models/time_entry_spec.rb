require "rails_helper"

RSpec.describe TimeEntry, type: :model do
  it { is_expected.to respond_to(:date) }
  it { is_expected.to respond_to(:hours) }
end
