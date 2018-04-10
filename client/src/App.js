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
    coffeeShops: []
  }

  componentDidMount() {
    this.getShops()
  }
  // Google key AIzaSyAhd3Coj_Y9FS4Y1OEYllqN1rTa1Rzjq08



  getShops = async () => {
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
