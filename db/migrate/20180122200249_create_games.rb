class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :name, null: false
      t.string :min_player_count
      t.string :max_player_count
      t.text :description, null: false

      t.timestamps
    end
  end
end
