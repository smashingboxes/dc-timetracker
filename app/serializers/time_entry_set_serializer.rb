class TimeEntrySetSerializer < ActiveModel::Serializer
  attributes :description, :charge_code

  has_many :time_entries
end
