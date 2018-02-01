class Api::V1::CategoriesController < ApplicationController
  def index
    if params[:game_id]
      game = Game.find(params[:game_id])
      game_categories = game.categories
      render json: game_categories
    else
      categories = Category.all
      render json: categories, include: [:games]
    end
  end
end
