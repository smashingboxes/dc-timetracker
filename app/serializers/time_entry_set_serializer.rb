class TimeEntrySetSerializer < ActiveModel::Serializer
  attributes :id, :description, :charge_code

  has_many :timeEntries

  def timeEntries
    object.time_entries
  end
end
