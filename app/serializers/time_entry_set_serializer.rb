class TimeEntrySetSerializer < ActiveModel::Serializer
  attributes :id, :description

  belongs_to :chargeCode

  has_many :timeEntries

  def timeEntries
    object.time_entries
  end

  def chargeCode
    object.charge_code
  end
end
