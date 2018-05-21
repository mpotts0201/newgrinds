import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import Home from './components/Home'


class App extends Component {

  state = {
    signedIn: false,
  }

  signUp = async (email, password, password_confirmation) => {

    try {
      const payload = {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
      await axios.post('/auth', payload)
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
      await axios.post('/auth/sign_in', payload)
      this.setState({ signedIn: true })
    } catch (error) {
      console.log(error)
    }
  }



  render() {

    const SignUpLogInWrapper = (props) => {
      return <SignUpLogIn
        {...props}
        signUp={this.signUp}
        signIn={this.signIn}

      />
    }

    const HomeWrapper = (props) => {
      return <Home {...props} />
    }



    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/signUp' render={SignUpLogInWrapper} />
            <Route exact path='/' render={HomeWrapper} />
          </Switch>
          {this.state.signedIn ? <Redirect to='/' /> : <Redirect to='/signUp' />}
        </div>
      </Router>
    );
  }
}

export default App;
