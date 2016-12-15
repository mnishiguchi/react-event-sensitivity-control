import React, { Component } from 'react';
import NotificationSystem   from 'react-notification-system';

import RussianDoll from './components/RussianDoll';
require('./App.css');

class App extends Component {
  render() {
    const notificationStyles = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // SearchPagelied to every notification, regardless of the notification level
          zIndex    : 10,
          fontSize  : '20px',
          background: 'rgba(22, 82, 124, 0.8)',
          color     : 'rgb(202,178,161)'
        }
      }
    };
    return (
      <div className="App">
        <NotificationSystem
          ref="notificationSystem"
          style={notificationStyles}
        />
        <div className="App-header">
          <h2>
            React russian doll event detection
            <br />
            <small>with event-sensitivity control</small>
          </h2>
        </div>
        <div className="App-intro">

          <RussianDoll
            onEnterHandler={this.onEnterHandler}
            onExitHandler={this.onExitHandler}
            options={this.options}
          />

        </div>
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    // Set up the notification system.
    this._notificationSystem = this.refs.notificationSystem;
  }


  // ---
  // PUBLIC METHODS
  // ---


  onEnterHandler = (e) => {
    // console.log('onEnterHandler was invoked')
    e.target.style.backgroundColor = "#ff70ca";
    this._addNotification( `${e.target.classList[0]} was ${e.type}'ed` );
  }

  onExitHandler = (e) => {
    // console.log('onExitHandler was invoked')
    e.target.style.backgroundColor = "#caff70";
    this._addNotification( `${e.target.classList[0]} was ${e.type}'ed` );
  }
  
  options = () => {
    return {
      sensitivity: 7,   // in pixels
      interval   : 200, // in milliseconds
      timeout    : 400  // in milliseconds
    };
  };


  // ---
  // PRIVATE METHODS
  // ---


  _addNotification(message, level='success') {
    this._notificationSystem.addNotification({message, level});
  }
}

export default App;
