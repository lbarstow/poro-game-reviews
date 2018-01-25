class CreateVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :votes do |t|
      t.integer :value, null: false
      t.belongs_to :user, null: false
      t.belongs_to :review, null: false

      t.timestamps
    end
  end
end
