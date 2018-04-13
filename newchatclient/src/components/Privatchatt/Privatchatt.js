import React from 'react';
import { Redirect } from 'react-router-dom';
import './privatchatt.css';


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
                  return <li key={user._id}>{user.userName}</li>;
                }
              )
            }
}
var h1Styles = {
  color: 'white',
  fontSize: 2 + 'em',
  fontFamily: 'Raleway',
  paddingBottom: 0.3 + 'em'
};
var pStyles = {
  color: 'white',
  fontSize: 0.8 + 'em',
  fontFamily: 'Raleway',
  paddingBottom: 0.3 + 'em'
};
window.setInterval(function() {
        var elem = document.getElementsByClassName('chattbox');
          console.log(elem);
        elem[0].scrollTop = elem[0].scrollHeight;
      }, 500);
class Privatchatt extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputMessage: null,
      data: []
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.chattMsg = this.chattMsg.bind(this);
  }
  onTextChange(event) {
    this.setState({ inputMessage: event.target.value });
  }

handleChange(e) {
  if (e.key == 'Enter') {
     this.chattMsg();
  }
};

chattMsg() {
      fetch('http://localhost:3003/privmsg', {
        body: '{ "privateSender": "' + sessionStorage.getItem("username") + '", "receiver": "' + this.props.match.params.id + '", "privateText": "' + this.state.inputMessage + '" }',
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
//-----------------------------------------------------------------------------
    componentDidMount() {
    setInterval(function () {
      fetch('http://localhost:3003/privmsg/'+this.props.match.params.id+'/'+sessionStorage.getItem("username")).then(function (response) {
      return response.json();
    }).then(function (result) {
        this.setState({
          data: result
        });
      }.bind(this))
    }.bind(this), 1000)
    }

msgOutput() {
  return this.state.data.map(function (msg) {
    return <p className="p-chatt-styling" key={msg._id}>{msg.privateSender}: {msg.privateText}</p>;
      }.bind(this)
    )
}


  render() {
    if (sessionStorage.getItem("username") === null) {
      return <Redirect to="/" />
    }
    return (
    <div>

    <h4 style={pStyles}>Inloggad som {sessionStorage.getItem("username")}</h4>
    <div className="chattwrapper">
      <h1 style={h1Styles}>Privatchatt med {this.props.match.params.id}</h1>
      <div className="chattbox">
        {this.msgOutput()}
      </div>
      <div className="chatt-input">
        <input className="input-field" placeholder="Börja Chatta" onKeyPress={this.handleChange.bind(this)} onChange={this.onTextChange}></input>
        <button className="send-btn" onClick={this.chattMsg}>Send</button>
      </div>
    </div>
  </div>
    );
  }
}

export default Privatchatt;
