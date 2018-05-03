# == Schema Information
#
# Table name: user_charge_codes
#
#  charge_code_id :integer
#  created_at     :datetime         not null
#  id             :integer          not null, primary key
#  updated_at     :datetime         not null
#  user_id        :integer
#

class UserChargeCode < ApplicationRecord
  belongs_to :user
  belongs_to :charge_code
end
