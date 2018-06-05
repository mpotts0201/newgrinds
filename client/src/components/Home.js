import React, { Component } from 'react';
import logo from '../img/load2.png';
import '../App.css';
import axios from 'axios'
// import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import CoffeeShopList from './CoffeeShopList'
// import CoffeeShopShow from './CoffeeShopShow'
import NavBar from './NavBar'
// import NewUser from './User/NewUser'
// import UserIndex from './User/UserIndex'
// import UserShow from './User/UserShow'
import video from '../videos/newgrinds.mp4'


// Think of ditching coffee shop show and build as single page app, reviews can be modal???

class Home extends Component {

  state = {
    coffeeShops: [],
    lat: null,
    long: null,
    error: null,
    city: '',
    state: '',
    streetAddress: '',
    zip: '',
    callSucceeded: false,
    showWaiting: true,
    signedIn: false,
  }


  componentDidMount() {
    this.requestCurrentPosition()
    if (this.state.callSucceeded) {
      this.locateShops(this.state.lat.toString(), this.state.long.toString())
    }
  }

  sendShop = async () => {
    const res = await axios.post("/search", {
      city: this.state.city,
      state: this.state.state,
      streetAddress: this.state.streetAddress,
      zip: this.state.zip,
    })
    console.log(res)
    this.setState({ coffeeShops: res.data.coffee_shops.response.venues })
  }

  getShopsBackend = async () => {

    const res = await axios.get(`/api/coffee_shops/`)
    this.setState({ coffeeShops: res.data.coffee_shops.response.venues })
    console.log(res)
  }

  handleChange = (event) => {
    const name = event.target.name
    const newState = { ...this.state }
    newState[name] = event.target.value
    this.setState(newState)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.sendShop()
    // this.setState({
    //   city: '',
    //   state: '',
    //   streetAddress: '',
    //   zip: '',
    // })
  }


  requestCurrentPosition = async () => {
    try {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            error: null,
            showWaiting: false,
            callSucceeded: true,

          });
          if (this.state.lat && this.state.long) {
            this.locateShops(this.state.lat.toString(), this.state.long.toString())
          }


        },
        (error) => this.setState({ error: error.message, showWaiting: false }),
        // (error) => {
        //   this.setState({ lat: 33, long: -84, callSucceeded: true, showWaiting: false })
        //   this.locateShops(this.state.lat.toString(), this.state.long.toString())

        // },

        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },

      );
    } catch (error) {
      console.log(error)
    }


  }

  locateShops = async (lat, long) => {
    const res = await axios.patch('/locate', {
      lat: lat,
      long: long
    })
    console.log(res)
    this.setState({
      coffeeShops: res.data.coffee_shops.response.venues,
    })
  }



  render() {


    // const UserShowWrapper = (props) => {
    //   return <UserShow {...props} />
    // }


    // const CoffeeShopListWrapper = (props) => {
    //   return <CoffeeShopList coffeeShops={this.state.coffeeShops} {...props}
    //     handleChange={this.handleChange}
    //     value={this.state.value}
    //     handleSubmit={this.handleSubmit}
    //     city={this.state.city}
    //     state={this.state.state}
    //     streetAddress={this.state.streetAddress}
    //     zip={this.state.zip}
    //     lat={this.state.lat}
    //     long={this.state.long}
    //   />
    // }



    if (this.state.callSucceeded || this.state.error) {

      return (
        // <Router>
          <div >
            <div id="myVideo">
              <video autoPlay muted loop >
                <source src={video} type="video/mp4" />
              </video>
            </div>
            <div id='content'>
              <NavBar signOut={this.props.signOut} />


              <CoffeeShopList coffeeShops={this.state.coffeeShops}
                handleChange={this.handleChange}
                value={this.state.value}
                handleSubmit={this.handleSubmit}
                city={this.state.city}
                state={this.state.state}
                streetAddress={this.state.streetAddress}
                zip={this.state.zip}
                lat={this.state.lat}
                long={this.state.long}
              />


              {/* <div className='App' >
                <Switch>
                  <Route exact path='/coffeeShop/:id' render={CoffeeShopShowWrapper} />
                </Switch>

              </div> */}


            </div>
          </div>
        // </Router>
      );
    }
    else if (this.state.showWaiting) {
      return (
        <div className='loading'>
          <h1>Looking for shops near you...</h1>
          <img className='App-logo' src={logo} alt='LOADING...' />
        </div>
      );
    }
  }
}

export default Home;
