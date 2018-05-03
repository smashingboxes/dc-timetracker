require "rails_helper"

describe "POST /api/v1/jobs", as: :request do
  subject { authenticated_post(path: "/api/v1/jobs", params: params) }

  let(:params) do
    {
      code: Faker::Lorem.word,
      name: Faker::Lorem.word
    }
  end

  context "when given a valid charge code request" do
    it "returns a 200" do
      subject
      expect(response).to be_success
    end

    it "creates a charge code" do
      expect { subject }.to change(ChargeCode, :count).by(1)
    end

    it "returns the created charge code in the response" do
      subject
      expect(json_response).to include(:id, :code, :name)
    end
  end
end
