class ReviewsController < ApplicationController

  def new
    @current_user = current_user
    if !@current_user
      flash[:notice] = "Please sign in"
      redirect_to '/'
    else
      render :new
    end
  end

  def create
    @current_user = current_user
    render :new
  end

end
