require 'rails_helper'

RSpec.describe Game, type: :model do
  it "requires name and description" do
    game_1 = Game.new(name: "Lords of Waterdeep", description: "This is a game based on the Dungeons & Dragons universe.")
    game_2 = Game.new(name: "Settlers of Catan", min_player_count: 3, max_player_count: 4, description: "This is a chance-based resource collection and trading game")

    expect(game_1).to be_valid
    expect(game_2).to be_valid
  end

  it "is not valid without name" do
    game = Game.new(description: "This is a game based on the Dungeons & Dragons universe.")

    expect(game).to_not be_valid
  end

  it "is not valid without description" do
    game = Game.new(name: "Lords of Waterdeep")

    expect(game).to_not be_valid
  end

  it "is not valid when description is less than 50 characters" do
    game = Game.new(name: "Settlers of Catan", min_player_count: 3, max_player_count: 4, description: "Less than 50 characters")

    expect(game).to_not be_valid
  end

  it "is not valid when min player count is 0 or less" do
    game_1 = Game.new(name: "Lords of Waterdeep", min_player_count: (-1), description: "This is a game based on the Dungeons & Dragons universe.")
    game_2 = Game.new(name: "Settlers of Catan", min_player_count: 0, description: "This is a chance-based resource collection and trading game")

    expect(game_1).to_not be_valid
    expect(game_2).to_not be_valid
  end

  it "is not valid when max player count is 1 or less" do
    game_1 = Game.new(name: "Lords of Waterdeep", max_player_count: (-1), description: "This is a game based on the Dungeons & Dragons universe.")
    game_2 = Game.new(name: "Settlers of Catan", max_player_count: 1, description: "This is a chance-based resource collection and trading game")

    expect(game_1).to_not be_valid
    expect(game_2).to_not be_valid
  end
end
