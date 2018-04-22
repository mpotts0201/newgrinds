import React, { Component } from 'react';



class NewReview extends Component {
    render() {
        return (
            <div>
                
                <form className='list search' onSubmit={this.props.handleSubmit}>
                
                <label htmlFor='stars'>Give a star rating out of 5: </label>
                    <input type='text' 
                    name='stars'
                    onChange={this.props.handleChange}
                    value={this.props.stars}
                    placeholder='1-5'
                    />
                    <label htmlFor='title'>Title of Review: </label>
                    <input type='text' 
                    name='title'
                    onChange={this.props.handleChange}
                    value={this.props.title}
                    />

                    <label htmlFor='text'>Review: </label>
                    <textarea cols='50' rows='20'type='text' 
                    name='text'
                    onChange={this.props.handleChange}
                    value={this.props.text}
                    />
                    <button>Submit Review</button>
                </form>
            </div>
        );
    }
}

export default NewReview;