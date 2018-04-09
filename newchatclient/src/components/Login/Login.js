import React from 'react';
import { Redirect } from 'react-router-dom';

import './login.css';
import Reg from '../Registrering/Registrering.js';
import Popup from '../Registrering/Popup.js';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        loggedIn: false
      };
      // this.handleUsername = this.handleUsername.bind(this);
      // this.handlePassword = this.handlePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    // handleUsername(event) {
    //   this.setState({value: event.target.value});
    // }

    // handlePassword(event) {
    //   this.setState({value1: event.target.value});
    // }

    setLoggedIn() {
      this.setState({ loggedIn: true })
    }

    handleSubmit(event) {
      event.preventDefault();

      const that = this;

      fetch('http://localhost:3003/api/inlogg', {
          body: '{ "userName": "' + this.state.username + '", "passWord": "' + this.state.password + '"}',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          if (!result.error) {
            that.setState({ loggedIn: true })
          } else {alert('Fel lösenord')};
        })

      sessionStorage.setItem("username", this.state.username);

    }

    render() {
      if (this.state.loggedIn) {
        return <Redirect to="/gruppchatt" />
      }

      return (
        <div className="container">
          <div className="main">
            <h2>Logga in på ProjektChatt</h2>
            <form onSubmit={this.handleSubmit}>
              <label>User Name :
              <input name="username" id="username" type="text" onChange={input => this.setState({ username: input.target.value })} />
              </label>
              <label>Password :
              <input name="password" id="password" type="text" onChange={input => this.setState({ password: input.target.value })}  />
              </label>
              <button type="submit" value="Submit" id="submit">Go!</button>
              <p className="inlogg-p">Inget konto? Klicka </p>
              </form>
             <Reg />
          </div>
        </div>
      );
    }
  };

export default Login;
