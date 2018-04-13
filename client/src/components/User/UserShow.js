import React, { Component } from 'react';
import axios from 'axios'


class UserShow extends Component {
    state = {
        showEdit: false
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        const res = await axios.get(`/api/users/${this.props.match.params.userId}`)
        this.setState({
            name: res.data.user.name,
            aboutMe: res.data.user.aboutMe
        })

    }

    handleSubmit = () => {

    }

    handleChange = (event) => {
        const name = event.target.name
        const newState = { ...this.state }
        newState[name] = event.target.value
        this.setState(newState)
    }

    toggle = () => {
        this.setState({ showEdit: !this.state.showEdit })
    }

    render() {
        return (
            <div className='update' >
                <h1>{this.state.name}</h1>
                <h4>{this.state.aboutMe}</h4>
                <button onClick={this.toggle}>Update User Info</button>
                {this.state.showEdit
                    ?
                    <div>
                        <form onSubmit={this.handleSubmit}>

                            <input name='name'
                                type='text'
                                onChange={this.handleChange}
                                value={this.state.name}
                                placeholder={this.state.name}
                            />
                            <textarea cols='50' name='aboutMe'
                                type='text'
                                onChange={this.handleChange}
                                value={this.state.aboutMe}
                                placeholder={this.state.aboutMe}
                            />
                            <button type='submit'>Update User</button>



                        </form>
                    </div>
                    : null}
            </div>
        );
    }
}

export default UserShow;