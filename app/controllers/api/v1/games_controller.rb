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
    game = Game.find(params[:id])
    review_hash = game.reviews.as_json.map do |x|
      x.merge!("username"=>User.find(x["user_id"]).username)
    end
    render json: { reviews: review_hash, game: game }, include: [:categories]
  end

  def create
    game = Game.new(game_params)
    game.categories = Category.where(id: params[:categories])

    if game.save
      render json: { game: game}, include: [:categories]
    else
      render json: {error: game.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def game_params
    params.require(:game).permit(:name, :description, :categories, :min_player_count, :max_player_count, :user_id)
  end
end
