class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  def index
    @game = Game.find(params[:game_id])
    @reviews = @game.reviews
    render json: @reviews, include: [:user]
  end

  def create
    puts
    review = Review.new(review_params)
    @game = Game.find(params[:game_id])
    review.game = @game
    if review.save
      render json: { review: review}, include: [:categories]
    else
      puts review.errors.full_messages
      render json: {error: review.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:body, :rating, :user_id, :game_id)
  end

end
