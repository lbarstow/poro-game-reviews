class Game < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :description, length: { minimum: 50 }
end
