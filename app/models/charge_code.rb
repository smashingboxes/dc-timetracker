# == Schema Information
#
# Table name: charge_codes
#
#  code       :string
#  created_at :datetime         not null
#  id         :integer          not null, primary key
#  name       :string
#  updated_at :datetime         not null
#

class ChargeCode < ApplicationRecord
  has_many :user_charge_codes, dependent: :destroy
  has_many :users, through: :user_charge_codes
end
