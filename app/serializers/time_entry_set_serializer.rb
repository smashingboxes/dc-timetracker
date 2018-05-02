class TimeEntrySetSerializer < ActiveModel::Serializer
  attributes :id, :description, :charge_code

  has_many :time_entries
end
