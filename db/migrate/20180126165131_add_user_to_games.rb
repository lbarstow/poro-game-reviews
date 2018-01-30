class AddUserToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :user_id, :bigint, null: false
    add_foreign_key :games, :users
  end
end
