class AddTimeEntrySetIdToTimeEntry < ActiveRecord::Migration[5.1]
  def change
    add_reference :time_entries, :time_entry_set, foreign_key: true
  end
end
