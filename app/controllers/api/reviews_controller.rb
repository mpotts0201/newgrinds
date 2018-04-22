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
        @coffee_shop = CoffeeShop.find(params[:coffee_shop_id])

        @user = User.find_by(name: "Murphy Potts")
        @review = Review.new(review_params)

        @coffee_shop.reviews << @review
        @user.reviews << @review

        @coffee_shop.save!
        @user.save!

        render json: @review



    end 

    def destroy 
         
    end 

    def update

    end 

    private

    def review_params
        params.require(:review).permit(:title, :text, :stars)
    end


end
