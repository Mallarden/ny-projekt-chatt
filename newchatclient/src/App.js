
import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import Login from './components/Login/Login';
import Gruppchatt from './components/Gruppchatt/Gruppchatt';
import Registrering from './components/Registrering/Registrering';
import Privatchatt from './components/Privatchatt/Privatchatt';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route exact path="/" component={Login} />
        <Route path="/gruppchatt" component={Gruppchatt} />
        <Route path="/registrering" component={Registrering} />
        <Route path="/privatchatt/:id" component={Privatchatt} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
