require "rails_helper"

describe "POST /api/v1/timesheets", as: :request do
  subject { post "/api/v1/timesheets", params: params }
  let(:params) { {} }
  let(:time_entries) do
    (1..6).map do |i|
        { 
            date: (Time.zone.now + i.day).midnight.to_s, 
            hours: i
        }
    end
  end

  context "a user has not submitted a prior request" do
    let(:params) do
      {
        activeDate: Time.zone.now.midnight.to_s
        timeEntriesSets: [
            { chargeCode: "123abc",
              timeEntries:  time_entries[0..3]
            },
            { chargeCode: "123abc123",
              timeEntries:  time_entries[3..5]
            }
        ]
      }
    end

    it "returns a 200" do
      subject
      expect(response).to be_success
    end

    pending "creates a timesheet request" do
      expect { subject }.to change { Timesheet.count }.by(1)
      expect { subject }.to change { TimeEntrySet.count }.by(2)
      expect { subject }.to change { TimeEntry.count }.by(6)
    end
  end