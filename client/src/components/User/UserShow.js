import React, { Component } from 'react';
import axios from 'axios'
import UserIndex from './UserIndex'
import { Redirect } from 'react-router-dom'


class UserShow extends Component {
    state = {
        showEdit: false,
        redirectToUsers: false
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async() => {
        const res = await axios.get(`/api/users/${this.props.match.params.userId}`)
        this.setState({
            name: res.data.user.name,
            aboutMe: res.data.user.aboutMe
        })

    }

    handleSubmit = async(event) => {
        event.preventDefault()
        console.log(this.state.name)
        const res = axios.patch(`/api/users/${this.props.match.params.userId}`,{
            name: this.state.name,
            aboutMe: this.state.aboutMe
        })
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

    handleDelete = async() => {
        const res = axios.delete(`/api/users/${this.props.match.params.userId}`)
        console.log(res)
        this.setState({ redirectToUsers: !this.state.redirectToUsers })
        // this.props.getUsers()
        
    }

    render() {
        if(this.state.redirectToUsers){
            return <Redirect to='/users' render={UserIndex}/>
        }
        return (
            <div className='update' >
                <h1>{this.state.name}</h1>
                <h4>{this.state.aboutMe}</h4>
                <button onClick={this.toggle}>Update User Info</button>
                <button onClick={this.handleDelete}>Delete User Account</button>
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