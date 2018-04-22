class Api::CoffeeShopsController < ApplicationController
    

    
    def index

        @coffee_shops = CoffeeShop.all 

        render json: {
            coffee_shops: @coffee_shops
        }


    end

    def show

        # takes navigation call if sending lat and long
        
        if !params[:lat].nil? && !params[:long].nil?
            @lat = params[:lat].to_s
            @long = params[:long].to_s
            @api_id = params[:api_id]
            @origin = @lat + ',' + @long

        # takes call if sending any number of details/ not lat and long
        elsif (!params[:city].nil? || !params[:state].nil? || !params[:streetAddress].nil? || !params[:zip].nil?)
            @api_id = params[:api_id]
            @city = params[:city]
            @state = params[:state]
            @street_address = params[:streetAddress]
            @zip = params[:zip].to_s

        # @origin is string being built to be passed into nav call 

            @origin = @street_address + ' ' + @city + ' ,' + @state + ' ,' + @zip

        end


        # calling api for details on destination
        @coffee_shop = CoffeeShop.getShop(@api_id)


        # string to store destination for nav call
        @location = ''

        # if the shop data is from api call and not yet saved to database
            array = @coffee_shop["response"]["venue"]["location"]["formattedAddress"]
            array.map{|each|  
                @location = @location + ' ' + each
            }  
            @location 


        # calling for reviews if any are saved to database

        # @reviews = @coffee_shop.reviews

        # @coffee_shop.reviews 
        # this method is not yet complete 
        # needs to find a way to associate api_id with reviews 
        # or find a way to save coffee shop to database when review is 
            # posted so review associates with local id
        # Would have to fix the way params are passed into this show method 
            # use a get with params axios({ method: "get", params: {...} })
            # Because shops are being saved everytime a post is made from 
            # front end with duplicate api_id's
        @navigation = CoffeeShop.nav(@origin,@location)
        render json: {
            # reviews: @reviews,
            navigation: @navigation,
            coffee_shop: @coffee_shop,
        }
    end



    def create
        @api_id = params[:api_id]
        @name = params[:name]
        @address = params[:address]
        

        # @coffee_shop_info = CoffeeShop.getShop(api_id)
        # array = @coffee_shop_info["response"]["venue"]["location"]["formattedAddress"]
        # @address = ''
        # array.map{|each|  
        #     @address = @address + ' ' + each
        # }  

        if CoffeeShop.find_by api_id: @api_id
            @coffee_shop = CoffeeShop.find_by api_id: @api_id
        else
            @coffee_shop = CoffeeShop.create({
                name: @name,
                address: @address,
                api_id: @api_id
                
            })
        end


        render json: {
            coffee_shop: @coffee_shop
        }
        
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
