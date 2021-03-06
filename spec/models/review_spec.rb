require 'rails_helper'

RSpec.describe Review, type: :model do
  it "requires rating, game, and user" do
    user = User.new()
    game = Game.new(name: "Lords of Waterdeep", user: user, description: "This is a game based on the Dungeons & Dragons universe.")

    review = Review.new(rating: 2, game: game, user: user)

    expect(review).to be_valid
  end

  it "if not given, victory points value defaults to 0" do
    user = User.new()
    game = Game.new(name: "Lords of Waterdeep", user: user, description: "This is a game based on the Dungeons & Dragons universe.")

    review = Review.new(rating: 2, game: game, user: user)

    expect(review.victory_points).to eq(0)
  end

  it "is not valid without rating" do
    user = User.new()
    game = Game.new(name: "Lords of Waterdeep", user: user, description: "This is a game based on the Dungeons & Dragons universe.")

    review = Review.new(game: game, user: user)

    expect(review).to_not be_valid
    expect(review.errors[:rating]).to_not be_blank
  end

  it "is not valid if rating is not an integer between 1 and 5" do
    user = User.new()
    game = Game.new(name: "Lords of Waterdeep", user: user, description: "This is a game based on the Dungeons & Dragons universe.")

    review_1 = Review.new(rating: 2.5, game: game, user: user)
    review_2 = Review.new(rating: 0, game: game, user: user)
    review_3 = Review.new(rating: 6, game: game, user: user)

    expect(review_1).to_not be_valid
    expect(review_1.errors[:rating]).to_not be_blank
    expect(review_2).to_not be_valid
    expect(review_2.errors[:rating]).to_not be_blank
    expect(review_3).to_not be_valid
    expect(review_3.errors[:rating]).to_not be_blank
  end

  it "victory points can't be a float" do
    user = User.new()
    game = Game.new(name: "Lords of Waterdeep", user: user, description: "This is a game based on the Dungeons & Dragons universe.")

    review = Review.new(rating: 2, game: game, user: user, victory_points: 2.5)

    expect(review).to_not be_valid
    expect(review.errors[:victory_points]).to_not be_blank
  end

end
