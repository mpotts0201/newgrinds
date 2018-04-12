class CoffeeShop < ApplicationRecord
    include HTTParty
    # base_uri 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDhik26QdA3b09N5JGtTnORhD2zyZLDJkk'

    VENUES_URL = "https://api.foursquare.com/v2/venues/"
    VENUE_ID = "4b3d8035f964a520ee9425e3"
    VERSION = "20180410"
    CLIENT_ID = "OAE53NLS2LND0FHVZ14GBSLES2CB2JWNFM200JMSBHPNHGBB"
    CLIENT_SECRET = "VS0QRUM1VDO0U2CMTS1HTCWUF5ZG0PH4UPM3O34GPP2F40KF"

    def self.getShop(id)      
        final_url = VENUES_URL + id + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&v=" + VERSION
        @res = HTTParty.get(final_url)
    end

    ORIGIN = "Octane+Coffee+Little+Tart+Bakeshop"

    # LAT = "33.7722584"
    # LNG = "-84.3665152"

    def self.nav(location)
        string = ''
        location.map{|each|  
            string = string + ' ' + each
            puts string
        }
        default = "Ponce City Market, Atlanta, GA 30308"

        # @response = HTTParty.get('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDhik26QdA3b09N5JGtTnORhD2zyZLDJkk')
        @response = HTTParty.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + default + '&destination=' + string + '&key=AIzaSyDhik26QdA3b09N5JGtTnORhD2zyZLDJkk')


        @response   
    end



end
