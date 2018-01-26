class GamesController < ApplicationController
  def index
  end

  def show
    render :index
  end
  def new
    @game = Game.new
    @categories = Category.all
  end

  def create
    @game = Game.new(game_params)
    #@game.categories = Category.where(id: params[:game][:category_ids])
    if @game.save
      redirect_to @game
    else
      #WHEN LAURA FREAKS OUT LATER THIS IS THE FIRST PLACE TO LOOK FOR ROUTING/RENDERING ISSUES
      render :new
    end
  end

  private

  def game_params
    params.require(:game).permit(:name, :description, :min_player_count, :max_player_count)
  end

end
