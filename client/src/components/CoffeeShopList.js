import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CoffeeShopList extends Component {
    render() {
        return (
            <div>
                {this.props.coffeeShops.map((shop, i) => {
                    return (
                        <h3 key={i}><Link className='link' to={`/coffeeShop/${shop.id}`}>{shop.name}</Link></h3>
                    )
                })}
            </div>
        );
    }
}

export default CoffeeShopList;