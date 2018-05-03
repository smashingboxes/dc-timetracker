require "rails_helper"

describe "GET /api/v1/jobs/:id", as: :request do
  subject { authenticated_get(path: "/api/v1/jobs/#{id}", params: params) }

  let!(:charge_code) { create(:charge_code) }
  let(:id) { charge_code.id }

  let(:params) { {} }

  context "when given a valid request" do
    it "returns a 200" do
      subject
      expect(response).to be_success
    end

    it "returns the correct response" do
      subject
      expect(json_response).to include("id", "code", "name")
    end
  end
end
