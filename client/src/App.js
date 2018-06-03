import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import Home from './components/Home'
import { saveAuthTokens, userLoggedIn, setAxiosDefaults, clearAuthTokens } from './util/SessionHeaderUtil'
import NewUser from './components/User/NewUser'
import UserIndex from './components/User/UserIndex'
import UserShow from './components/User/UserShow'
// import CoffeeShopList from './components/CoffeeShopList'
import CoffeeShopShow from './components/CoffeeShopShow'
import ReactDOM from 'react-dom'

class App extends Component {

  state = {
    signedIn: false,
  }

  componentDidMount() {
    try {
      const signedIn = userLoggedIn()

      if (signedIn) {
        setAxiosDefaults()
      }

      this.setState(signedIn)
    } catch (err) {
      console.log(err)
    }
  }

  signUp = async (email, password, password_confirmation) => {

    try {
      const payload = {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
      const response = await axios.post('/auth', payload)

      saveAuthTokens(response.headers)

      this.setState({ signedIn: true })
    } catch (error) {
      console.log(error)
    }
  }

  signIn = async (email, password) => {
    try {
      const payload = {
        email: email,
        password: password
      }
      const response = await axios.post('/auth/sign_in', payload)

      saveAuthTokens(response.headers)

      this.setState({ signedIn: true })
    } catch (error) {
      console.log(error)
    }
  }


  signOut = async (event) => {
    try {
      event.preventDefault()

      await axios.delete('/auth/sign_out')

      clearAuthTokens();

      this.setState({ signedIn: false })
    } catch (error) {
      console.log(error)
    }
  }

  skipSignIn = () => {
    clearAuthTokens()
    this.setState({ signedIn: true })
  }



  
  
  render() {

    const UserShowWrapper = (props) => {
      return <UserShow {...props} />
    }


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

    const CoffeeShopShowWrapper = (props) => {
      return <CoffeeShopShow getShops={this.getShops}
        coffeeShops={this.state.coffeeShops}
        city={this.state.city}
        state={this.state.state}
        streetAddress={this.state.streetAddress}
        zip={this.state.zip}
        lat={this.state.lat}
        long={this.state.long}
        {...props} />
    }


    const SignUpLogInWrapper = (props) => {
      return <SignUpLogIn
        {...props}
        signUp={this.signUp}
        signIn={this.signIn}
        skipSignIn={this.skipSignIn}

      />
    }

    const HomeWrapper = (props) => {
      return <Home {...props} signOut={this.signOut} />
    }



    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/signUp' render={SignUpLogInWrapper} />
            <Route exact path='/' render={HomeWrapper} />
            <Route exact path='/new' component={NewUser} />
            <Route exact path='/coffeeShop/:id' render={CoffeeShopShowWrapper} />
            <Route exact path='/index' component={UserIndex} />
            <Route exact path='/users/:userId' render={UserShowWrapper} />
          </Switch>

          {this.state.signedIn ? <Redirect to='/' /> : <Redirect to='/signUp' />}
          <button onClick={clearAuthTokens}>Clear Tokens</button>

        </div>
      </Router>
    );
  }
}

export default App;
