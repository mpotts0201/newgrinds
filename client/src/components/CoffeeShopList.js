import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Search from './Search'


class CoffeeShopList extends Component {
    render() {
        return (
            <div className='list'>
                <h2>5 coffee shops near your location</h2>

            {this.props.coffeeShops
               ? this.props.coffeeShops.map((shop, i) => {
                    return (
                        <h3 key={i} className='list'><Link className='link' to={`/coffeeShop/${shop.id}`}>{shop.name}</Link></h3>
                    )
                })
            :<h2 className='warning list'>Bad search, please try again</h2>}

                <Search handleChange={this.props.handleChange}
                    value={this.props.value}
                    handleSubmit={this.props.handleSubmit}
                />



            </div>
        );
    }
}

export default CoffeeShopList;