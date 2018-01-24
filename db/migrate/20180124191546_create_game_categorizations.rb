class CreateGameCategorizations < ActiveRecord::Migration[5.1]
  def change
    create_table :game_categorizations do |t|
      t.belongs_to :game, null: false
      t.belongs_to :category, null: false

      t.timestamps
    end
  end
end
