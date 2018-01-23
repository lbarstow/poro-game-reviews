require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do
  let!(:first_game) { Game.create(name: "Arkham Horror", min_player_count: 1, max_player_count: 8, description: "Horror game where you can punch Cthulhu in the face") }

  describe "GET#index" do
    it "should return a list of games" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json[0]["name"]).to eq "Arkham Horror"
      expect(returned_json[0]["min_player_count"]).to eq 1
      expect(returned_json[0]["max_player_count"]).to eq 8
      expect(returned_json[0]["description"]).to eq "Horror game where you can punch Cthulhu in the face"

    end
  end
end
