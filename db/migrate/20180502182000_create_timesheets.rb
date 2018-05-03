class CreateTimesheets < ActiveRecord::Migration[5.1]
  def change
    create_table :timesheets do |t|
      t.references :user, foreign_key: true
      t.datetime :period_start

      t.timestamps
    end
  end
end
