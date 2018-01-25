class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    render json: Game.all
  end

  def create
    game = Game.new(name: params[:name], description: params[:description], min_player_count: params[:min_player_count], max_player_count: params[:max_player_count])
    if game.save
      render json: { game: game}
    else
      puts game.errors.full_messages
      render json: {error: game.errors.full_messages}, status: :unprocessable_entity
    end
  end
end
