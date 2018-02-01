class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    if params[:category_id]
      category = Category.find(params[:category_id])
      category_games = category.games
      if category_games.size == 0
        page_count = 1
      elsif category_games.size % 5 == 0
        page_count = category_games.size / 5
      else
        page_count = category_games.size / 5 + 1
      end

      selected_category_games = category.games.offset(params[:page].to_i * 5).limit(5)

      render json:  { games: selected_category_games, pages: page_count }, include: [:reviews, :categories]
    else

      if !params[:s]
        games = Game.offset(params[:page].to_i * 5).limit(5)
        if Game.count == 0
          page_count = 1
        else
          page_count = (Game.count / 5.0).ceil
        end
      else
        searched_games= Game.where("UPPER(name) LIKE ? OR UPPER(description) LIKE ?", "%#{params[:s].upcase}%", "%#{params[:s].upcase}%" )
        games = searched_games.offset(params[:page].to_i * 5).limit(5)
        if searched_games.count == 0
          page_count = 1
        else
          page_count = (searched_games.count/5.0).ceil
        end

      end
      render json: { pages: page_count, games: games}, include: [:reviews, :categories]
    end
  end

  def show
    game = Game.find(params[:id])
    review_hash = game.reviews.as_json.map do |x|
      x.merge!("username"=>User.find(x["user_id"]).username)
    end
    total_rating = 0
    game.reviews.each do |review|
      total_rating += review.rating
    end
    average_rating = (total_rating/game.reviews.size.to_f).round(2)

    render json: { reviews: review_hash, game: game, average_rating: average_rating }, include: [:categories]
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
