import React, { Component } from 'react';
import axios from 'axios'




class CoffeeShopShow extends Component {


    state = {
        coffeeShops: [],
        coffeeShop: {
            name: null,
        },
        navigation: [],

    }

    componentDidMount() {
        this.callShopData()
    }

    getShop = async () => {
        const res = await axios({
            method: 'GET',
            url: `https://api.foursquare.com/v2/venues/`,
            params: {
                client_id: 'OAE53NLS2LND0FHVZ14GBSLES2CB2JWNFM200JMSBHPNHGBB',
                client_secret: 'VS0QRUM1VDO0U2CMTS1HTCWUF5ZG0PH4UPM3O34GPP2F40KF',
                // id: '4e495987ae6014a2fdc4ccf9',
            }
        })
        console.log(res)
        // console.log(res.data.response.groups[0].items)
    }

    callShopData = async () => {
        const res = await axios.get(`/api/coffee_shops/${this.props.match.params.id}`)
        console.log(res.data.coffee_shop.response.venue)
        // this.setState({ coffeeShop: res.data.coffee_shop.response.venue })
        // console.log(this.state.coffeeShop.location)
    }


    render() {
        return (
            <div className='list'>

                {/* {this.state.coffeeShop.name !== null
                    ? <div className='list'>
                        <h1>{this.state.coffeeShop.name}</h1>
                        <h3>{this.state.coffeeShop.location.formattedAddress.map((each, i) => {
                            return (
                                <div className='address' key={i}>{each}</div>
                            )
                        })}</h3>
                        <a href={this.state.coffeeShop.url}>{this.state.coffeeShop.url}</a>

                    </div>
                    : null} */}



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