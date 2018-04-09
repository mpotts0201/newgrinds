import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {

  

  componentDidMount(){
    this.getShopsFS()
  }
  // Google key AIzaSyAhd3Coj_Y9FS4Y1OEYllqN1rTa1Rzjq08



  getShopsFS = async() => {
    const res = await axios({
      method: 'GET',
      url: 'https://api.foursquare.com/v2/venues/search',
      params: {
        client_id: 'OAE53NLS2LND0FHVZ14GBSLES2CB2JWNFM200JMSBHPNHGBB',
        client_secret: 'VS0QRUM1VDO0U2CMTS1HTCWUF5ZG0PH4UPM3O34GPP2F40KF',
        // ll: '40.7243,-74.0018',
        near: 'Atlanta, GA',
        query: 'coffee',
        v: '20180323',
        limit: 5,
        sortByDistance: 1,
      }
    })
    // console.log(res.data.response.groups[0].items)
    console.log(res.data.response.venues)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
