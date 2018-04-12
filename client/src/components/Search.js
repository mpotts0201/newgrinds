import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <form>
                <label className='search'>Enter your City, State:
                <input type='text' name='city'/>
                </label>
            </form>
        );
    }
}

export default Search;