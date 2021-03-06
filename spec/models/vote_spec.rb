require 'rails_helper'

RSpec.describe Vote, type: :model do
  let!(:user_1) { User.create!(email: "none@none.com", password: "foobar", username: 'user_1', sign_in_count: 1) }
  let!(:user_2) { User.create!(email: "none2@none.com", password: "foobars", username: 'user_2', sign_in_count: 3) }
  let!(:user_3) { User.create!(email: "none3@none.com", password: "foobars", username: 'user_3', sign_in_count: 3) }
  let!(:user_4) { User.create!(email: "none4@none.com", password: "foobars", username: 'user_4', sign_in_count: 3) }
  let!(:game) { Game.create!(name: "Arkham Horror", user: user_1, min_player_count: 1, max_player_count: 8, description: "Horror game where you can punch Cthulhu in the face") }
  let!(:review_1) { Review.create!(rating: 4, body: "Great game!!!", victory_points: 1, game: game, user: user_1) }
  let!(:review_2) { Review.create!(rating: 4, body: "Really great game!!!", victory_points: 1, game: game, user: user_2) }

  it "should be valid when a -1 or +1 vote value, review, and user is supplied" do
    downvote = Vote.new(value: -1, user: user_1, review: review_1)
    upvote = Vote.new(value: 1, user: user_2, review: review_1)

    expect(downvote).to be_valid
    expect(upvote).to be_valid
  end

  it "should not be valid if vote is anything but -1 or +1" do
    invalid_vote_1 = Vote.new(value: 0, user: user_1, review: review_1)
    invalid_vote_2 = Vote.new(value: 2, user: user_2, review: review_1)
    invalid_vote_3 = Vote.new(value: -2, user: user_3, review: review_1)
    invalid_vote_4 = Vote.new(value: 0.5, user: user_4, review: review_1)

    expect(invalid_vote_1).to_not be_valid
    expect(invalid_vote_1.errors[:value]).to_not be_blank

    expect(invalid_vote_2).to_not be_valid
    expect(invalid_vote_2.errors[:value]).to_not be_blank

    expect(invalid_vote_3).to_not be_valid
    expect(invalid_vote_3.errors[:value]).to_not be_blank
  end

  it "should require a value" do
    invalid_vote = Vote.new(user: user_1, review: review_1)

    expect(invalid_vote).to_not be_valid
    expect(invalid_vote.errors[:value]).to_not be_blank
  end

  it "should require a review" do
    invalid_vote = Vote.new(value: 1, user: user_1)

    expect(invalid_vote).to_not be_valid
    expect(invalid_vote.errors[:review]).to_not be_blank
  end

  it "should require a user" do
    invalid_vote = Vote.new(value: 1, review: review_1)

    expect(invalid_vote).to_not be_valid
    expect(invalid_vote.errors[:user]).to_not be_blank
  end

  it "should have expected Votes per user" do
    vote_1 = Vote.create!(value: -1, user: user_1, review: review_1)
    vote_2 = Vote.create!(value: -1, user: user_2, review: review_1)
    vote_3 = Vote.create!(value: 1, user: user_2, review: review_2)

    expect(user_1.votes.size).to eq(1)
    expect(user_2.votes.size).to eq(2)
  end

  it "should have expected Votes per review" do
    vote_1 = Vote.create!(value: -1, user: user_1, review: review_1)
    vote_2 = Vote.create!(value: -1, user: user_2, review: review_1)
    vote_3 = Vote.create!(value: 1, user: user_2, review: review_2)

    expect(review_1.votes.size).to eq(2)
    expect(review_2.votes.size).to eq(1)
  end
end
