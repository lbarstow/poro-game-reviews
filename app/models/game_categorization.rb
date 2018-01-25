class GameCategorization < ApplicationRecord
  validates :game, presence: true
  validates :category, presence: true

  belongs_to :game
  belongs_to :category
end
