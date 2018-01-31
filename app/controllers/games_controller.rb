class GamesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    @current_user = current_user
  end

  def show
    @current_user = current_user
    render :index
  end

  def new
    @current_user = current_user
    if !@current_user
      flash[:notice] = "Please sign in"
      redirect_to '/'
    else
      render :index
    end

  end

  def create
    @current_user = current_user
    render :index
  end
end
