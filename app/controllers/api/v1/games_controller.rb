class Api::V1::GamesController < ApplicationController
  def index
    if params[:category_id]
      category = Category.find(params[:category_id])
      category_games = category.games

      render json: category_games
    else
      render json: Game.all
    end
  end
end
