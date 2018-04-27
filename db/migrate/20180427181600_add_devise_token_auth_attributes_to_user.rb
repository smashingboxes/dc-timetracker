class AddDeviseTokenAuthAttributesToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :provider, :string, :null => false, :default => "email"
    add_column :users, :uid, :string, :null => false
    add_column :users, :tokens, :json

    add_index :users, [:uid, :provider], unique: true
  end
end
