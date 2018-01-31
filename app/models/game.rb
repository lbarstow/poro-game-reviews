class Game < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :description, length: { minimum: 50 }
  validates :min_player_count, allow_nil: true, numericality: { greater_than: 0 }
  validates :min_player_count, allow_nil: true, numericality: { only_integer: true }
  validates :max_player_count, allow_nil: true, numericality: { greater_than: 0 }
  validates :max_player_count, allow_nil: true, numericality: { only_integer: true }

  has_many :reviews
  has_many :game_categorizations
  has_many :categories, through: :game_categorizations
  belongs_to :user
end
