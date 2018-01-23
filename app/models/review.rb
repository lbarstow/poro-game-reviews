class Review < ApplicationRecord
  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :victory_points, presence: true, numericality: { only_integer: true }
  validates :game, presence: true
  validates :user, presence: true

  belongs_to :game
  belongs_to :user
end
