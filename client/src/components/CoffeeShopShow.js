import React, { Component } from 'react';
import axios from 'axios'
import NewReview from './NewReview'



class CoffeeShopShow extends Component {


    state = {
        coffeeShops: [],
        coffeeShop: {},
        title: '',
        text: '',

    }

    componentDidMount() {
        this.callNavData()
    }

    handleChange = (event) => {
        const name = event.target.name
        const newState = { ...this.state }
        newState[name] = event.target.value
        this.setState(newState)
    }

    handleSubmit = async(event) => {
        event.preventDefault()
        let location = ''
        this.state.coffeeShop.location.formattedAddress.map((each, i) => {
            location = location + ' ' + each
        })
        const shopRes = await axios.post('/api/coffee_shops', {
            api_id: this.props.match.params.id,
            name: this.state.coffeeShop.name,
            address: location
            
        })
        console.log(shopRes)
        const res = await axios.post(`/api/coffee_shops/${shopRes.data.coffee_shop.id}/reviews`, {
            title: this.state.title,
            text: this.state.text,
        })
        console.log(res)

        


    }

    callNavData = async () => {

        if (this.props.lat && this.props.long) {
            const res = await axios.post(`/nav/`, {
                lat: this.props.lat,
                long: this.props.long,
                api_id: this.props.match.params.id
            })
            const coffeeShop = res.data.coffee_shop.response.venue

            const navigation = res.data.navigation.routes[0].legs[0]
            this.setState({ 
                navigation: navigation,
                coffeeShop: coffeeShop
             })
            console.log(res.data)
        }
        else if (this.props.city || this.props.state || this.props.streetAddress || this.props.zip) {
            const res = await axios.post(`/nav/`, {
                city: this.props.city,
                state: this.props.state,
                streetAddress: this.props.streetAddress,
                zip: this.props.zip,
                api_id: this.props.match.params.id,

            })
            const coffeeShop = res.data.coffee_shop.response.venue
            const navigation = res.data.navigation.routes[0].legs[0]
            console.log(res.data)
            this.setState({ 
                navigation: navigation,
                coffeeShop:  coffeeShop
             })
            console.log(this.state.navigation)
        }


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
                        if (shop.id == this.props.match.params.id) {
                            return (
                                <div key={i} className='update'>
                                    <h1>{shop.name}</h1>
                                    <h3>{shop.location.formattedAddress.map((each, i) => {
                                        return (
                                            <div className='address' key={i}>{each}</div>
                                        )
                                    })}</h3>
                                    {this.state.navigation
                                        ? <p>{this.state.navigation.distance.text}, {this.state.navigation.duration.text} to drive to {shop.name} from {this.state.navigation.start_address}</p>

                                        : <h3>No navigation data at this time</h3>}
                                    <a href={shop.url}>{shop.url}</a>
                                </div>
                            )
                        }
                    })
                }

                <NewReview handleChange={this.handleChange}
                    title={this.state.title}
                    text={this.state.text}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default CoffeeShopShow;