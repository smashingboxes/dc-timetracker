# == Schema Information
#
# Table name: time_entries
#
#  created_at        :datetime         not null
#  date              :datetime
#  hours             :float
#  id                :integer          not null, primary key
#  time_entry_set_id :integer
#  updated_at        :datetime         not null
#

class TimeEntry < ApplicationRecord
  belongs_to :time_entry_set
end
