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
        location = @coffee_shop["response"]["venue"]["location"]["formattedAddress"]
        puts location
        @navigation = CoffeeShop.nav(location)
        
        render json: {
            coffee_shop: @coffee_shop,
            navigation: @navigation
        }
    end

    def create
        @coffee_shop = CoffeeShop.create(coffee_shop_params)
        
    end




    private

    def coffee_shop_params
        params.require(:coffee_shop).permit(:name, :address, :hours)
    end

end
