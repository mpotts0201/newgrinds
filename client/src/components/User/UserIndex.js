import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserIndex extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = async() => {
        const res = await axios.get('/api/users')
        this.setState({
            users: res.data.users
        })
    }

    render() {
        return (
            <div className='list'>
                <h3>Users</h3>
                {
                    this.state.users.map((user, i) => {
                        return (
                            <div key={i}>
                                <h2><Link  className='link' to={`/users/${user.id}`}>{user.name}</Link></h2>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default UserIndex;