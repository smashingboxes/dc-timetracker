require 'rails_helper'

RSpec.describe ChargeCode, type: :model do
  it { is_expected.to respond_to(:code) }
end
