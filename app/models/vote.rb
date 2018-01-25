class Vote < ApplicationRecord
  validates :value, numericality: { only_integer: true,
                                    odd: true,
                                    greater_than_or_equal_to: -1,
                                    less_than_or_equal_to: 1
                                  }
  validates :user, presence: true
  validates :review, presence: true

  belongs_to :user
  belongs_to :review
end
