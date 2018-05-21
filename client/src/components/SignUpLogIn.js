import React, { Component } from 'react';

class SignUpLogIn extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '',
    }

    signUp = (event) => {
        event.preventDefault()
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.password_confirmation
        )
    }

    signIn = (event) => {
        event.preventDefault()
        this.props.signIn(
            this.state.email,
            this.state.password
        )
    }

    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <form className='list search form'>
                <h1>new<span>grinds</span></h1>

                    <div>
                        <label htmlFor='email'>email: </label>
                        <input value={this.state.email} name='email' onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='password'>password: </label>
                        <input value={this.state.password} name='password' onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor='password_confirmation'>password confirmation: </label>
                        <input value={this.state.password_confirmation} name='password_confirmation' onChange={this.handleChange} />
                    </div>
                    <button onClick={this.signUp}>Sign Up</button>
                    <button onClick={this.signIn}>Log In</button>

                </form>

            </div>
        );
    }
}

export default SignUpLogIn;