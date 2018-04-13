import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './gruppchatt.css';

// komponent för att lägga till meddelande i databasen som användaren skriver i inputfältet.

class ChattMsg extends React.Component {
    constructor(props) {
      super();
      this.state = {
        inputMessage: null
      };
      this.onTextChange = this.onTextChange.bind(this);
    }
    onTextChange(event) {
      this.setState({ inputMessage: event.target.value });
    }

    handleChange(e) {
      if (e.key == 'Enter') {
         this.chattFunc();
      }
    };

    chattFunc() {
      fetch('http://localhost:3003/api/gruppchatt', {
        body: '{ "publicSender": "' + sessionStorage.getItem("username") + '", "publicText": "' + this.state.inputMessage + '" }',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        console.log(result);
      });
    }

    render() { console.log(sessionStorage.getItem("username"));
      return <div className="chatt-input">
        <input className="input-field" ref="input" placeholder="Börja Chatta" onKeyPress={this.handleChange.bind(this)} onChange={this.onTextChange}></input>
        <button className="send-btn" onClick={this.chattFunc}>Send</button>
        </div>
    }
  };



  // komponent för att hämta databas collection "users" och sedan skriva ut det i chattbox diven.
  class MsgOutput extends React.Component {
    constructor(props) {
      super();
      this.state = {
        data: []
      };
    }

  componentDidMount() {
  setInterval(function () {
    fetch('http://localhost:3003/api/gruppchatt').then(function (response) {
    return response.json();
  }).then(function (result) {
      this.setState({
        data: result
      });
    }.bind(this))
  }.bind(this), 1000)
  }

  render() {
    return this.state.data.map(function (msg) {
      return <p className="p-chatt-styling" key={msg._id}>{msg.publicSender}: {msg.publicText}</p>;
        }
      )
    }
  };
  class UsersList extends React.Component {
    constructor(props) {
      super();
      this.state = {
        usersData: []
      };
    
    }

    componentDidMount() {
        fetch('http://localhost:3003/api/inlogg').then(function (response) {
          return response.json();
        }).then(function (result) {
          this.setState({
            usersData: result
          });

          }.bind(this))
      }


      render () {
        return this.state.usersData.map(function (user) {
                    return <div className="dropdown">
                      <li key={user._id}>{user.userName}</li>
                      <div className="dropdown-content"><Link to={"/privatchatt/"+user.userName+"/"+sessionStorage.getItem("username")} target="_blank"><p>Starta privatchatt med {user.userName}</p></Link></div>
                    </div>;
                  }
                )
              }
            }


  var pStyles = {
    color: 'white',
    fontSize: 0.8 + 'em',
    fontFamily: 'Raleway',
    paddingBottom: 0.3 + 'em'
  };
class Gruppchatt extends React.Component {
  render() {
    if (sessionStorage.getItem("username") === null) {
      return <Redirect to="/" />
    }
    return <div>
    <div className="user-list-wrapper">
      <ul>
        <UsersList></UsersList>
      </ul>
    </div>
    <h4 style={pStyles}>Inloggad som {sessionStorage.getItem("username")}</h4>
    <div className="chattwrapper">
      <div className="chattbox">
      <MsgOutput></MsgOutput>
      </div>
      <ChattMsg></ChattMsg>
     </div>
     </div>
  }
}

export default Gruppchatt;
