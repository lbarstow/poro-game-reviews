class Api::V1::ReviewsController < ApplicationController
  def index
    @game = Game.find(params[:game_id])
    @reviews = @game.reviews
    render json: @reviews, include: [:user]
  end
end
