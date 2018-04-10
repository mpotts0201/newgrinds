import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class NavBar extends Component {
    render() {
        return (
            <div>
                <h1>newgrinds</h1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/favorites'>Favorite Shops</Link></li>
                </ul>
            </div>
        );
    }
}

export default NavBar;