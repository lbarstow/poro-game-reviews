class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.text :body
      t.integer :victory_points, null: false, default: 0
      t.belongs_to :game, null: false
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
