class AddTimesheetIdToTimeEntrySet < ActiveRecord::Migration[5.1]
  def change
    # This is not ideal, but since we're not too concerned with "production" data at the moment,
    # this should be okay
    TimeEntrySet.all.destroy_all
    add_reference :time_entry_sets, :timesheet
    remove_column :time_entry_sets, :user_id
  end
end
