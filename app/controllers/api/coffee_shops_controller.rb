class Api::CoffeeShopsController < ApplicationController
    def index
        @coffee_shops = CoffeeShop.all 
        render json: {
            coffee_shops: @coffee_shops
        }
    end

    def show 
        @coffee_shop = CoffeeShop.find(params[:id])
        render json: {
            coffee_shop: @coffee_shop
        }
    end


end
