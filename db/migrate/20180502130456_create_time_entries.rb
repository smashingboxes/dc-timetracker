class CreateTimeEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :time_entries do |t|
      t.datetime :date
      t.float :hours

      t.timestamps
    end
  end
end
