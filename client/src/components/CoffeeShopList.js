import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Search from './Search'

class CoffeeShopList extends Component {
    render() {
        return (
            <div className='list'>

                <div className='results'>

                    <h2>5 coffee shops near your location</h2>

                    {this.props.coffeeShops
                        ? this.props.coffeeShops.map((shop, i) => {
                            return (
                                <h3 key={i} className='list shops'><Link className='link' to={`/coffeeShop/${shop.id}`}>{shop.name}</Link></h3>
                            )
                        })
                        : <h2 className='warning list'>Bad search, please try again</h2>}
                </div>
                <Search handleChange={this.props.handleChange}
                    value={this.props.value}
                    handleSubmit={this.props.handleSubmit}
                    city={this.props.city}
                    state={this.props.state}
                    streetAddress={this.props.streetAddress}
                    zip={this.props.zip}
                    lat={this.props.lat}
                    long={this.props.long}
                />



            </div>
        );
    }
}

export default CoffeeShopList;