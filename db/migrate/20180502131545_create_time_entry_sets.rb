class CreateTimeEntrySets < ActiveRecord::Migration[5.1]
  def change
    create_table :time_entry_sets do |t|
      t.text :description
      t.string :charge_code

      t.timestamps
    end
  end
end
