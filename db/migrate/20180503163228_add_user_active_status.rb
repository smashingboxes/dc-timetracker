class AddUserActiveStatus < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :active, :boolean, :null => true
  end
end
