require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:game_one) {Game.create!(name: "Arkham Horror", min_player_count: 1, max_player_count: 8, description: "Horror game where you can punch Cthulhu in the face")}
  let!(:user_one) {User.create!(email: "none@none.com", password: "foobar", username: 'user_one', sign_in_count: 1)}
  let!(:review_one) { Review.create!(rating: 4, body: "Great game!!!", victory_points: 1, game_id: game_one.id, user_id: user_one.id)}

  describe "GET#index" do
    it "shows reviews for a specified game" do
      get :index, params: {game_id: game_one.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json[0]["rating"]).to eq 4
      expect(returned_json[0]["body"]).to eq "Great game!!!"
      expect(returned_json[0]["victory_points"]).to eq 1
      expect(returned_json[0]["game_id"]).to eq game_one.id

    end
  end
end
