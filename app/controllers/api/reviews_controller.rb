class Api::ReviewsController < ApplicationController

    def index
        @reviews = Review.all
        render json: {
            reviews: @reviews
        }
    end

    def show

    end 

    def create 
        Review.create(review_params)
    end 

    def destroy 
         
    end 

    def update

    end 

    private

    def review_params
        params.require(:review).permit(:title, :text, :users_id, :coffee_shops_id)
    end


end
