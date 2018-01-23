class Api::V1::ReviewsController < ApplicationController
  def index
    @reviews = Game.find(params[:game_id]).reviews
    render json: @reviews
  end
end
