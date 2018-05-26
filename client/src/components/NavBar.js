import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class NavBar extends Component {
    render() {
        return (
            <div className='nav'>
                <Link className='header' to='/'><h1>new<span>grinds</span></h1></Link>
                <ul className='bar'>
                    <li><Link className='menu' to='/favorites'>favorite<span>shops</span></Link></li>
                    <li><Link className='menu' to='/favorites'><span>reviews</span></Link></li>

                    <li><Link className='menu' onClick={this.props.signOut}>sign<span>out</span></Link></li>

                </ul>
            </div>
        );
    }
}

export default NavBar;