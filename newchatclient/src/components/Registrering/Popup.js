import React from 'react';
import { Redirect } from 'react-router-dom';

import './registrering.css';

class Popup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.state = {value1: ''};
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
   handleUsername(event) {
       this.setState({value: event.target.value});
   }
  
     handlePassword(event) {
       this.setState({value1: event.target.value});
     }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch('http://localhost:3003/api/register', {
          body: '{ "userName": "' + this.state.value + '", "passWord": "' + this.state.value1 + '"}',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(function (response) {
          if (response.status == 409) {
            alert('Användarnamn upptaget!');
          } else if (response.status == 200) {
            this.props.closePopup(),
            alert('Registrering slutförd');
          };
          return response.json();
        }.bind(this));    
    }
      render() {
        return (
          <div className='popup'>
            <div className='popup_inner'>
            <form onSubmit={this.handleSubmit}>
            <div id="popup-inputs">
                <label className="user-name-reg">User Name :
                <button type="button" id="close-me-button" onClick={this.props.closePopup}>X</button>
                <input name="username" id="reg-username" type="text" value={this.state.value} onChange={this.handleUsername}   />
                </label>
                <label>Password :
                <input name="password" id="reg-password" type="text" value={this.state.value1} onChange={this.handlePassword}   />
                </label>
                <button type="button" id="register-button" type="submit" value="Submit" id="submit">Register</button>
                </div>
                </form>
              <h1>{this.props.text}</h1>
            </div>
          </div>        
        );
      }
    }

    export default Popup;