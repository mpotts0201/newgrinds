import React, { Component } from 'react';
import axios from 'axios'




class CoffeeShopShow extends Component {


    state = {
        coffeeShops: [],
        coffeeShop: {},

    }

    componentDidMount(){
        this.navCall()
    }

    getShop = async () => {
        const res = await axios({
          method: 'GET',
          url: `https://api.foursquare.com/v2/venues/1523478074?`,
          params: {
            client_id: 'OAE53NLS2LND0FHVZ14GBSLES2CB2JWNFM200JMSBHPNHGBB',
            client_secret: 'VS0QRUM1VDO0U2CMTS1HTCWUF5ZG0PH4UPM3O34GPP2F40KF',
            // id: '4e495987ae6014a2fdc4ccf9',
          }
        })
        console.log(res)
        // console.log(res.data.response.groups[0].items)
      }
    
      navCall = async() => {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=${process.env.REACT_APP_GOOGLE_NAV}`)
        console.log(res)
      }


    render() {
        return (
            <div>

                    {
                        this.props.coffeeShops.map((shop, i) => {
                            if(shop.id == this.props.match.params.id){
                                return (
                                    <div key={i}>
                                        <h1>{shop.name}</h1>
                                        <h3>{shop.location.formattedAddress.map((each, i) => {
                                            return (
                                            <div className='address' key={i}>{each}</div>
                                            )
                                        })}</h3>
                                        <a href={shop.url}>{shop.url}</a>
                                    </div>
                                )
                            }
                        })
                    }
               
            </div>
        );
    }
}

export default CoffeeShopShow;