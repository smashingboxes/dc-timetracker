# == Schema Information
#
# Table name: time_entries
#
#  created_at :datetime         not null
#  date       :datetime
#  hours      :float
#  id         :integer          not null, primary key
#  updated_at :datetime         not null
#

class TimeEntry < ApplicationRecord
end
