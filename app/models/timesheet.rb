# == Schema Information
#
# Table name: timesheets
#
#  created_at   :datetime         not null
#  id           :integer          not null, primary key
#  period_start :datetime
#  updated_at   :datetime         not null
#  user_id      :integer
#

class Timesheet < ApplicationRecord
  belongs_to :user

  has_many :time_entry_sets, dependent: :destroy
  has_many :time_entries, through: :time_entry_sets
end
