import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import Home from './components/Home'
import { saveAuthTokens, userLoggedIn, setAxiosDefaults, clearAuthTokens } from './util/SessionHeaderUtil'

class App extends Component {

  state = {
    signedIn: false,
  }

  async componentWillMount() {
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
          </Switch>

          {this.state.signedIn ? <Redirect to='/' /> : <Redirect to='/signUp' />}
          <button onClick={clearAuthTokens}>Clear Tokens</button>

        </div>
      </Router>
    );
  }
}

export default App;
