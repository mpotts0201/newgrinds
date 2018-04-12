import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label className='search'>Enter your City: 
                <input type='text' name='city' 
                onChange={this.props.handleChange}
                value={this.props.value}
                />
                </label>
            </form>
        );
    }
}

export default Search;