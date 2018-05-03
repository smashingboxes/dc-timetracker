class CreateChargeCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :charge_codes do |t|
      t.string :code
      t.text :description
      t.timestamps
    end
  end
end