require "rails_helper"

describe "GET /api/v1/jobs", as: :request do
  subject { authenticated_get(path: "/api/v1/jobs", params: params) }

  let!(:charge_codes) { create_list(:charge_code, 3) }

  let(:params) { {} }

  context "when given a valid request" do
    it "returns a 200" do
      subject
      expect(response).to be_success
    end

    it "returns the correct response" do
      subject
      expect(json_response.length).to eq(charge_codes.length)
      # [
      #   { id: 1, code: 'ABC', name: 'NAME' },
      #   { id: 2, code: 'DEF', name: 'NAME2' },
      #   { id: 3, code: 'GHI', name: 'NAME3' }
      # ]
      expect(json_response).to all(include("id", "code", "name"))
    end
  end
end
