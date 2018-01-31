require 'rails_helper'

RSpec.describe Game, type: :model do
  it "requires name and description" do
    user = User.new()
    game_1 = Game.new(name: "Lords of Waterdeep", user: user, description: "This is a game based on the Dungeons & Dragons universe.")
    game_2 = Game.new(name: "Settlers of Catan", user: user, min_player_count: 3, max_player_count: 4, description: "This is a chance-based resource collection and trading game")

    expect(game_1).to be_valid
    expect(game_2).to be_valid
  end

  it "is not valid without name" do
    user = User.new()
    game = Game.new(user: user, description: "This is a game based on the Dungeons & Dragons universe.")

    expect(game).to_not be_valid
    expect(game.errors[:name]).to_not be_blank
  end

  it "is not valid without description" do
    user = User.new()
    game = Game.new(name: "Lords of Waterdeep", user: user)

    expect(game).to_not be_valid
    expect(game.errors[:description]).to_not be_blank
  end

  it "is not valid without user" do
    user = User.new()
    game = Game.new(name: "Lords of Waterdeep", description: "This is a game based on the Dungeons & Dragons universe.")

    expect(game).to_not be_valid
    expect(game.errors[:user]).to_not be_blank
  end

  it "is not valid when description is less than 50 characters" do
    user = User.new()
    game = Game.new(name: "Settlers of Catan", user: user, min_player_count: 3, max_player_count: 4, description: "Less than 50 characters")

    expect(game).to_not be_valid
    expect(game.errors[:description]).to_not be_blank
  end

  it "is not valid when min player count is 0 or less" do
    user = User.new()
    game_1 = Game.new(name: "Lords of Waterdeep", user: user, min_player_count: (-1), description: "This is a game based on the Dungeons & Dragons universe.")
    game_2 = Game.new(name: "Settlers of Catan", user: user, min_player_count: 0, description: "This is a chance-based resource collection and trading game")

    expect(game_1).to_not be_valid
    expect(game_1.errors[:min_player_count]).to_not be_blank
    expect(game_2).to_not be_valid
    expect(game_2.errors[:min_player_count]).to_not be_blank
  end

  it "is not valid when max player count is 0 or less" do
    user = User.new()
    game_1 = Game.new(name: "Lords of Waterdeep", user: user, max_player_count: (-1), description: "This is a game based on the Dungeons & Dragons universe.")
    game_2 = Game.new(name: "Settlers of Catan", user: user, max_player_count: 0, description: "This is a chance-based resource collection and trading game")

    expect(game_1).to_not be_valid
    expect(game_1.errors[:max_player_count]).to_not be_blank
    expect(game_2).to_not be_valid
    expect(game_2.errors[:max_player_count]).to_not be_blank
  end


end
