class Api::CoffeeShopsController < ApplicationController
    

    
    def index

        @coffee_shops = CoffeeShop.all 

        render json: {
            coffee_shops: @coffee_shops
        }


    end

    def show
        venue_id = params[:id]
        @coffee_shop = CoffeeShop.getShop(venue_id)
        @reviews = @coffee_shop.reviews
        location = @coffee_shop["response"]["venue"]["location"]["formattedAddress"]
        @navigation = CoffeeShop.nav(location)
        render json: {
            reviews: @reviews,
            navigation: @navigation,

        }
    end



    def create
        @coffee_shop = CoffeeShop.create(coffee_shop_params)
        
    end

    def search
        @city = params[:city]
        @coffee_shops = CoffeeShop.getShops(@city)


        render json: {
            coffee_shops: @coffee_shops,
        }
    end



    private

    def coffee_shop_params
        params.require(:coffee_shop).permit(:name, :address, :hours, :id)
    end

end
