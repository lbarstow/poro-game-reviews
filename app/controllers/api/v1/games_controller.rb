class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    render json: Game.all
  end

  def create
  end
end
