require "rails_helper"

describe "POST /api/v1/timesheets", as: :request do
  subject { authenticated_post(path: "/api/v1/timesheets", params: params) }

  let(:params) { {} }
  let(:time_entries) do
    (1..6).map do |i|
      {
        date: (Time.zone.now + i.day).midnight.to_s,
        hours: i
      }
    end
  end

  context "when a user has not submitted a prior request" do
    let(:params) do
      {
        active_date: Time.zone.now.midnight.to_s,
        time_entry_sets: [
          {
            charge_code: "123abc",
            time_entries:  time_entries[0..2]
          },
          {
            charge_code: "123abc123",
            time_entries:  time_entries[3..5]
          }
        ]
      }
    end

    it "returns a 200" do
      subject
      expect(response).to be_success
    end

    pending "creates a timesheet request" do
      expect { subject }.to change(Timesheet, :count).by(1)
      expect { subject }.to change(TimeEntrySet, :count).by(2)
      expect { subject }.to change(TimeEntry, :count).by(6)
    end
  end
end