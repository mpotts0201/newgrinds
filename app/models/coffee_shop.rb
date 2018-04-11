class CoffeeShop < ApplicationRecord
    include HTTParty
    base_uri 'https://api.foursquare.com/v2/'

    def self.generate(api_id)
        coffee_shop = find_by api_id: api_id
        return coffee_shop unless coffee_shop.nil?

        response = get "/#{api_id}"
    end
end
