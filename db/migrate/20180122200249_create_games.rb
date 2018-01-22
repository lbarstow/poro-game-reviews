class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.integer :min_player_count
      t.integer :max_player_count
      t.text :description, null: false

      t.timestamps
    end
  end
end
