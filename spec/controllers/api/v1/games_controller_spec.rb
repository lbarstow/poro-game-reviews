require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do
  let!(:first_game) { Game.create!(name: "Arkham Horror", min_player_count: 1, max_player_count: 8, description: "Horror game where you can punch Cthulhu in the face") }
  let!(:second_game) { Game.create!(name: "Dominion", min_player_count: 1, max_player_count: 4, description: "Deck building game with action, buy, and clean-up phases") }
  let!(:third_game) { Game.create!(name: "Secret Hitler", min_player_count: 4, max_player_count: 10, description: "You gotta find and kill Hitler or you lose! Liberals stink!") }
  let!(:first_category) { Category.create!(name: "Card") }
  let!(:first_categorization) { GameCategorization.create!(game: first_game, category: first_category)}
  let!(:second_categorization) { GameCategorization.create!(game: second_game, category: first_category)}

  describe "GET#index" do
    it "should return a list of all games when category_id is nil" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json[0]["name"]).to eq "Arkham Horror"
      expect(returned_json[0]["min_player_count"]).to eq 1
      expect(returned_json[0]["max_player_count"]).to eq 8
      expect(returned_json[0]["description"]).to eq "Horror game where you can punch Cthulhu in the face"

      expect(returned_json[2]["name"]).to eq "Secret Hitler"
      expect(returned_json[2]["min_player_count"]).to eq 4
      expect(returned_json[2]["max_player_count"]).to eq 10
      expect(returned_json[2]["description"]).to eq "You gotta find and kill Hitler or you lose! Liberals stink!"
    end

    it "should return a list of games by category if category_id exists" do
      get :index, params: { category_id: first_category.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["name"]).to eq "Arkham Horror"
      expect(returned_json[0]["min_player_count"]).to eq 1
      expect(returned_json[0]["max_player_count"]).to eq 8
      expect(returned_json[0]["description"]).to eq "Horror game where you can punch Cthulhu in the face"

      expect(returned_json[1]["name"]).to eq "Dominion"
      expect(returned_json[1]["min_player_count"]).to eq 1
      expect(returned_json[1]["max_player_count"]).to eq 4
      expect(returned_json[1]["description"]).to eq "Deck building game with action, buy, and clean-up phases"
    end
  end
end
