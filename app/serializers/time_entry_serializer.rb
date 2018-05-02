class TimeEntrySerializer < ActiveModel::Serializer
  attributes :id, :date, :hours
end
