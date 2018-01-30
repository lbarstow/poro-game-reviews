class GamesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
  end

  def show
    render :index
  end
  def new
    render :index
  end
  def create
    render :index
  end

end
