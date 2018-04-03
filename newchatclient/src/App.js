import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import Login from './components/Login/Login';
import Gruppchatt from './components/Gruppchatt/Gruppchatt';
import Registrering from './components/Registrering/Registrering';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path="/" component={Login} />
        <Route path="/gruppchatt" component={Gruppchatt} />
        <Route path="/registrering" component={Registrering} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
