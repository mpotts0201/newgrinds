class CoffeeShop < ApplicationRecord

    has_many :reviews, dependent: :destroy
    has_many :users, :through => :reviews


    include HTTParty
    # base_uri 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDhik26QdA3b09N5JGtTnORhD2zyZLDJkk'

    VENUE_URL = "https://api.foursquare.com/v2/venues/"
    VERSION = "20180410"
    CLIENT_ID = "OAE53NLS2LND0FHVZ14GBSLES2CB2JWNFM200JMSBHPNHGBB"
    CLIENT_SECRET = "VS0QRUM1VDO0U2CMTS1HTCWUF5ZG0PH4UPM3O34GPP2F40KF"

    def self.getShop(api_id)
        coffee_shop = find_by api_id: api_id
        return coffee_shop unless coffee_shop.nil?      
        final_url = VENUE_URL + api_id + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v=" + VERSION
        @res = HTTParty.get(final_url)
    end
    
    VENUES_URL = "https://api.foursquare.com/v2/venues/search/"
    
    def self.getShops(city)
        final_url = VENUES_URL + "?near=" + city + ",GA"  + "&query=coffee" + "&limit=5" + "&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v=" + VERSION
        @res = HTTParty.get(final_url)
    end 

    def self.nav(location)

        default = "Ponce City Market, Atlanta, GA 30308"
        @response = HTTParty.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + default + '&destination=' + location + '&key=AIzaSyDhik26QdA3b09N5JGtTnORhD2zyZLDJkk')


        @response   
    end





end
