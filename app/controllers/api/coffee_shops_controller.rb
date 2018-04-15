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

        # @coffee_shop_local = CoffeeShop.find(params[:id])
        @location = ''
        # @reviews = @coffee_shop.reviews
        if @coffee_shop["response"]
            array = @coffee_shop["response"]["venue"]["location"]["formattedAddress"]
            array.map{|each|  
                @location = @location + ' ' + each
            }  
            @location 
        else 
            @location = @coffee_shop.address
        
        end

        @navigation = CoffeeShop.nav(@location)
        render json: {
            # reviews: @reviews,
            navigation: @navigation,
            coffee_shop: @coffee_shop,
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
