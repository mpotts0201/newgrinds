import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CoffeeShopList extends Component {
    render() {
        return (
            <div>
                {this.props.coffeeShops.map((shop,i) => {
                    return(
                        <h1 key={i}><Link to=''>{shop.name}</Link></h1>
                    )
                })}
            </div>
        );
    }
}

export default CoffeeShopList;