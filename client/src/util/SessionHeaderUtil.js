import axios from 'axios'

export function saveAuthTokens (headers) {
    // Set default headers 
    axios.defaults.headers['access-token'] = headers['access-token']
    axios.defaults.headers.client = headers.client
    axios.defaults.headers.uid = headers.uid
    axios.defaults.headers.expiry = headers.expiry

    // Save to local storage 
    localStorage.setItem('access-token', headers['access-token'])
    localStorage.setItem('client', headers.client)
    localStorage.setItem('uid', headers.uid)
    localStorage.setItem('expiry', headers.expiry)

}


export function userLoggedIn() {
    const userLoggedIn = (
        !!localStorage.getItem('access-token') &&
        !!localStorage.getItem('client') && 
        !!localStorage.getItem('uid') &&
        !!localStorage.getItem('expiry')
    )

    return userLoggedIn
}

export function setAxiosDefaults() {
    axios.defaults.headers['access-token'] = localStorage.getItem('access-token');
    axios.defaults.headers.client = localStorage.getItem('client');
    axios.defaults.headers.uid = localStorage.getItem('uid');
    axios.defaults.headers.expiry = localStorage.getItem('expiry');
}

export function clearAuthTokens() {
    localStorage.removeItem('access-token')
    localStorage.removeItem('client')
    localStorage.removeItem('uid')
    localStorage.removeItem('expiry')

}