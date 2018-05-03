class TimesheetSerializer < ActiveModel::Serializer
  attributes :id, :periodStart

  belongs_to :user

  has_many :timeEntrySets

  def periodStart
    object.period_start
  end

  def timeEntrySets
    object.time_entry_sets
  end
end
