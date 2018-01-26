class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    if params[:category_id]
      category = Category.find(params[:category_id])
      category_games = category.games

      render json: category_games
    else
      render json: Game.all, include: [:reviews, :categories]
    end
  end

  def show
    render json: Game.find(params[:id]), include: [:reviews, :categories]
  end

  def create
    game = Game.new(game_params)
    if game.save
      render json: { game: game}
    else
      puts game.errors.full_messages
      render json: {error: game.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def game_params
    params.require(:game).permit(:name, :description, :min_player_count, :max_player_count)
  end
end
