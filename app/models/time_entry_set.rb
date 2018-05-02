# == Schema Information
#
# Table name: time_entry_sets
#
#  charge_code  :string
#  created_at   :datetime         not null
#  description  :text
#  id           :integer          not null, primary key
#  timesheet_id :integer
#  updated_at   :datetime         not null
#

class TimeEntrySet < ApplicationRecord
  belongs_to :user

  has_many :time_entries, dependent: :destroy
end
