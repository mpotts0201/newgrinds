class Api::UsersController < ApplicationController
  def index
    @users = User.all 
    render json: {
      users: @users
    }
  end

  def show
    @user = User.find(params[:id])
    @reviews = @user.reviews
    render json: {
      user: @user,
      reviews: @reviews
    }
  end

  def create
    @user = User.create(user_params)

  end

  def destroy
    User.find(params[:id]).destroy
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    
  end

  private

  def user_params
    params.require(:user).permit(:name, :aboutMe)
  end

end
