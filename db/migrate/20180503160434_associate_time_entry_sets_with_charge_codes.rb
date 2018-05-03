class AssociateTimeEntrySetsWithChargeCodes < ActiveRecord::Migration[5.1]
  def change
    remove_column :time_entry_sets, :charge_code, :string
    add_reference :time_entry_sets, :charge_code
  end
end
