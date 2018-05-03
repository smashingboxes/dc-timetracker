# == Schema Information
#
# Table name: charge_codes
#
#  code       :string
#  created_at :datetime         not null
#  id         :integer          not null, primary key
#  updated_at :datetime         not null
#

class ChargeCode < ApplicationRecord
  validates :code, presence: true
  validates :name, presence: true
end
