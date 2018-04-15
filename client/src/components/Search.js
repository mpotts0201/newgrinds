import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <form className='search list' onSubmit={this.props.handleSubmit}>
                <h2>If we did not find any shops, Please enter as many details about your location as possible</h2>
                <br />
                <label htmlFor='city'>Enter your City: </label>

                <input type='text' name='city'
                    onChange={this.props.handleChange}
                    value={this.props.city}
                />
                <br />

                <label htmlFor='state'>Enter your state: </label>

                <input type='text' name='state'
                    onChange={this.props.handleChange}
                    value={this.props.state}
                />
                <br />
                <label htmlFor='streetAddress'>Enter your Street Address: </label>

                <input type='text' name='streetAddress'
                    onChange={this.props.handleChange}
                    value={this.props.streetAddress}
                />
                <br />
                <label htmlFor='zip'>Enter your zip: </label>

                <input type='text' name='zip'
                    onChange={this.props.handleChange}
                    value={this.props.zip}
                />
                <br />
                <button type='submit'>Search</button>
            </form>
        );
    }
}

export default Search;