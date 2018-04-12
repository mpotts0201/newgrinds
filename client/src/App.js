import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import CoffeeShopList from './components/CoffeeShopList'
import CoffeeShopShow from './components/CoffeeShopShow'
import NavBar from './components/NavBar'

class App extends Component {

  state = {
    coffeeShops: [],
    lat: null,
    long: null,
    error: null,
    value: '',
  }


  componentDidMount() {
    this.requestCurrentPosition()
    // this.getShops()

  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.getShops(this.state.value)

  }


  requestCurrentPosition = async () => {
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

  getShops = async (city) => {
    const res = await axios({
      method: 'GET',
      url: 'https://api.foursquare.com/v2/venues/search',
      params: {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        // ll: `${lat},${long}`,
        // ll: '33.7722584, -84.3665152',
        near: `${city}, GA`,
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
      return <CoffeeShopList coffeeShops={this.state.coffeeShops} {...props} 
      handleChange={this.handleChange}
      value={this.state.value}
      handleSubmit={this.handleSubmit}
      />
    }

    const CoffeeShopShowWrapper = (props) => {
      return <CoffeeShopShow getShops={this.getShops} coffeeShops={this.state.coffeeShops} {...props} />
    }


    return (
      <Router>
        <div className='App'>
          <NavBar />
          <Switch>
            <Route exact path='/' render={CoffeeShopListWrapper} />
            <Route exact path='/coffeeShop/:id' render={CoffeeShopShowWrapper} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
