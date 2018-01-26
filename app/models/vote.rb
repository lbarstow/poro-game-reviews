class Vote < ApplicationRecord
  validates :value, inclusion: [-1, 1]

  belongs_to :user
  belongs_to :review
end
