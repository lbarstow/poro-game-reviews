require 'rails_helper'

RSpec.describe Api::V1::CategoriesController, type: :controller do
  let!(:user_one) { User.create!(email: "none@none.com", password: "foobar", username: 'user_one', sign_in_count: 1) }
  let!(:first_game) { Game.create!(name: "Arkham Horror", user: user_one, min_player_count: 1, max_player_count: 8, description: "Horror game where you can punch Cthulhu in the face") }
  let!(:first_category) { Category.create!(name: "Card") }
  let!(:second_category) { Category.create!(name: "Cooperative") }
  let!(:third_category) { Category.create!(name: "Dice") }
  let!(:first_categorization) { GameCategorization.create!(game: first_game, category: first_category)}
  let!(:second_categorization) { GameCategorization.create!(game: first_game, category: second_category)}

  describe "GET#index" do
    it "should return a list of all categories when game_id is nil" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json[0]["name"]).to eq "Card"
      expect(returned_json[1]["name"]).to eq "Cooperative"
      expect(returned_json[2]["name"]).to eq "Dice"
    end

    it "should return a list of categories by game if game_id exists" do
      get :index, params: { game_id: first_game.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["name"]).to eq "Card"
      expect(returned_json[1]["name"]).to eq "Cooperative"
    end
  end
end
