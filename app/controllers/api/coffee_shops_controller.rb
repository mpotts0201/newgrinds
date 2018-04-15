class Api::CoffeeShopsController < ApplicationController
    

    
    def index

        @coffee_shops = CoffeeShop.all 

        render json: {
            coffee_shops: @coffee_shops
        }


    end

    def show
        
        if !params[:lat].nil? && !params[:long].nil?
            @lat = params[:lat].to_s
            @long = params[:long].to_s
            @api_id = params[:api_id]
            @origin = @lat + ',' + @long
        elsif (!params[:city].nil? || !params[:state].nil? || !params[:streetAddress].nil? || !params[:zip].nil?)
            @api_id = params[:api_id]
            @city = params[:city]
            @state = params[:state]
            @street_address = params[:streetAddress]
            @zip = params[:zip].to_s

            @origin = @street_address + ' ' + @city + ' ,' + @state + ' ,' + @zip

        end
        @coffee_shop = CoffeeShop.getShop(@api_id)

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

        @navigation = CoffeeShop.nav(@origin,@location)
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
        @state = params[:state]
        @street_address = params[:streetAddress]
        @zip = params[:zip].to_s

        @location = @street_address + ' ' + @city + ' ,' + @state + ' ,' + @zip
        
        puts @location

        @coffee_shops = CoffeeShop.getShops(@location)


        render json: {
            coffee_shops: @coffee_shops,
        }
    end

    def locate
        @lat = params[:lat]
        @long = params[:long]



        @coord = @lat + ',' + @long

        @coffee_shops = CoffeeShop.locateShops(@coord)

        render json: {
            coffee_shops: @coffee_shops
        }
    end



    private

    def coffee_shop_params
        params.require(:coffee_shop).permit(:name, :address, :hours, :api_id, :description)
    end

end
