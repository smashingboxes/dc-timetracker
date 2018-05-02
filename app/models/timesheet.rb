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
end
