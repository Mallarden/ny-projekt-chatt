import React from 'react';
import { Redirect } from 'react-router-dom';

import './registrering.css';
import Popup from './Popup.js';


    class Reg extends React.Component {
      constructor() {
        super();
        this.state = {
          showPopup: false
        };
      }
      togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
      render() {
        return (
          <div className='reg'>
            <button type="button" id="first-reg-button" onClick={this.togglePopup.bind(this)}>Här</button>
            {this.state.showPopup ?
              <Popup
                closePopup={this.togglePopup.bind(this)}/>
              : null
            }
          </div>
        );
      }
    };

   export default Reg;

  
    

  