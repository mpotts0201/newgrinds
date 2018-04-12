import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import CoffeeShopList from './components/CoffeeShopList'
import CoffeeShopShow from './components/CoffeeShopShow'
import NavBar from './components/NavBar'
import dotenv from 'dotenv'
dotenv.config({silent:true})

class App extends Component {

  state = {
    coffeeShops: [],
    lat: null,
    long: null,
    error: null,
  }

//AIzaSyDhik26QdA3b09N5JGtTnORhD2zyZLDJkk

  componentDidMount() {
    this.requestCurrentPosition()
    console.log(process.env.hidden_key)
    this.getShops()


  }


  requestCurrentPosition = async() => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          error: null,
        });
        // this.getShops(position.coords.latitude, position.coords.longitude)
        // this.getShops(33.7722584, -84.3665152)

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
    
  }

  getShops = async () => {
    const res = await axios({
      method: 'GET',
      url: 'https://api.foursquare.com/v2/venues/search',
      params: {
        client_id: 'OAE53NLS2LND0FHVZ14GBSLES2CB2JWNFM200JMSBHPNHGBB',
        client_secret: 'VS0QRUM1VDO0U2CMTS1HTCWUF5ZG0PH4UPM3O34GPP2F40KF',
        // ll: `${lat},${long}`,
        // ll: '33.7722584, -84.3665152',
        near: 'Athens, GA',
        query: 'coffee',
        v: '20180323',
        limit: 5,
        sortByDistance: 1,
      }
    })
    this.setState({ coffeeShops: res.data.response.venues })
    // console.log(res.data.response.groups[0].items)
    console.log(res.data.response.venues)
  }



  render() {


    const CoffeeShopListWrapper = (props) => {
      return <CoffeeShopList coffeeShops={this.state.coffeeShops} {...props}/>
    }
  
    const CoffeeShopShowWrapper = (props) => {
      return <CoffeeShopShow getShops={this.getShops} coffeeShops={this.state.coffeeShops} {...props}/>
    }


    return (
        <Router>
          <div  className='App'>
            <NavBar />
            <Switch>
              <Route exact path = '/' render={CoffeeShopListWrapper}/>
              <Route exact path = '/coffeeShop/:id' render={CoffeeShopShowWrapper} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
