class CreateUserChargeCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :user_charge_codes do |t|
      t.references :user, foreign_key: true
      t.references :charge_code, foreign_key: true

      t.timestamps
    end
  end
end
