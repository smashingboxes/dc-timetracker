class AddUserIdToTimeEntrySet < ActiveRecord::Migration[5.1]
  def change
    add_reference :time_entry_sets, :user, foreign_key: true
  end
end
