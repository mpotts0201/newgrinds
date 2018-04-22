import React, { Component } from 'react';

class Reviews extends Component {
    render() {
        return (
            <div>
                {this.props.reviews.map((review, i) => {
                    const rating = []
                    {for(let j=0;j < review.stars;j++ ){
                        rating.push(<span key={j} className='fa fa-star checked'></span>)
                    }}
                    return (
                        <div key={i} className='list address update review'>
                            {rating}
                            <h1>{review.title}</h1>
                            <p>{review.text}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Reviews;