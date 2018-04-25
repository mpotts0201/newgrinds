import React, { Component } from 'react';
import axios from 'axios'



class NewUser extends Component {

state = {
    name: '',
    aboutMe: ''
}

handleSubmit = async(event) => {

    const res = await axios.post('/api/users/', {
        name: this.state.name,
        aboutMe: this.state.aboutMe
    })
}

handleChange = (event) => {
const name = event.target.name
const newState = {...this.state}
newState[name] = event.target.value
this.setState(newState)
}
    render() {
        return (
            <div >
                <form className='list search form' onSubmit={this.handleSubmit}>
                        <input type='text' name='name' 
                        placeholder='username' 
                        onChange={this.handleChange} 
                        value={this.state.name}/>
                    
                        <textarea cols='50' type='text' 
                        name='aboutMe' 
                        placeholder='Tell us about yourself' 
                        onChange={this.handleChange} 
                        value={this.state.aboutMe} />
                    <button>Submit</button>
                </form>

            </div>
        );
    }
}

export default NewUser;