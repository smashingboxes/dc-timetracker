require "rails_helper"

describe "GET /time_entries", type: :request do
  subject { get "/time_entries" }

  context "when not signed in" do
    it "denies access" do
      subject
      expect(response).to redirect_to login_url
    end
  end

  context "when signed in" do
    let(:user) { create(:user) }

    before { sign_in user }

    it "allows access" do
      subject
      expect(response).to be_success
    end
  end
end
