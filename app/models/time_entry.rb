# == Schema Information
#
# Table name: time_entries
#
#  created_at  :datetime         not null
#  description :text
#  end_time    :datetime
#  id          :integer          not null, primary key
#  start_time  :datetime
#  updated_at  :datetime         not null
#  user_id     :integer
#

class TimeEntry < ApplicationRecord
  belongs_to :user
  validate :start_before_end

  private
  
  def start_before_end
    errors.add(:end_time, 'must be after Start Time') if start_time > end_time
  end
end
