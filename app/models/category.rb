class Category < ApplicationRecord
  validates :name, presence: true

  has_many :game_categorizations
  has_many :games, through: :game_categorizations
end
