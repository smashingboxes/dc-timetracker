class TimeEntrySerializer < ActiveModel::Serializer
  attributes :date, :hours

  def date
    object.date.to_i
  end
end
