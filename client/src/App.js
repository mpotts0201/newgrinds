import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import CoffeeShopList from './components/CoffeeShopList'
import CoffeeShopShow from './components/CoffeeShopShow'
import NavBar from './components/NavBar'
import dotenv from 'dotenv'
dotenv.config()



class App extends Component {

  state = {
    coffeeShops: [],
    lat: '33.7722584',
    long: '-84.3665152',
    error: null,
  }



  componentDidMount() {
    // this.requestCurrentPosition()
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
        client_id: '',
        client_secret: '',
        // ll: `${lat},${long}`,
        // ll: '33.7722584, -84.3665152',
        near: 'Atlanta, GA',
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
      return <CoffeeShopList coffeeShops={this.state.coffeeShops} props={props}/>
    }
  
    const CoffeeShopShowWrapper = (props) => {
      return <CoffeeShopShow coffeeShops={this.state.coffeeShops} props={props}/>
    }


    return (
      <div className="App">
        <Router>
          <div>
            <NavBar />
            <Switch>
              <Route exact path = '/' render={CoffeeShopListWrapper}/>
              <Route exact path = '/coffee_shop' render={CoffeeShopShowWrapper} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
