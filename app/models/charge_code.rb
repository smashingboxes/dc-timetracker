# == Schema Information
#
# Table name: charge_codes
#
#  code        :string
#  created_at  :datetime         not null
#  description :text
#  id          :integer          not null, primary key
#  updated_at  :datetime         not null
#

class ChargeCode < ApplicationRecord
end
