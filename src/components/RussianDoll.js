import React, { Component } from 'react';
import NotificationSystem   from 'react-notification-system';

import eventSensitivityControl from '../lib/event-sensitivity-control';

const B1 = (props) => {
  return (
    <section className="B1">
      This is B1
      {props.children}
    </section>
  )
}
const B2 = (props) => {
  return (
    <section className="B2">
      This is B2
      {props.children}
    </section>
  )
}

class RussianDoll extends Component {

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
      <section
        className="RussianDoll"
        onClick={e => this._handleAllEvents(e)}
        onDoubleClick={e => this._handleAllEvents(e)}
        onMouseOver={e => this._handleAllEvents(e)}
        onMouseLeave={e => this._handleAllEvents(e)}
      >

        <NotificationSystem
          ref="notificationSystem"
          style={notificationStyles}
        />

        <B1>
          <B2>
            <section className="bottom1">
              This is the bottom1
            </section>
            <section className="bottom2">
              This is the bottom2
            </section>
          </B2>
        </B1>
      </section>
    );
  }

  componentDidMount() {
    // Set up the notification system.
    this._notificationSystem = this.refs.notificationSystem;


    this._listeners = [];
    [
      '.RussianDoll',
      '.B1',
      '.B2',
      '.bottom1',
      '.bottom2',
    ].forEach(selector => {
      const element = document.querySelector(selector);
      this._listeners.push( this._setListener( element ) );
    })
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => {
      listener.remove();
    })
    this._listeners = [];
  }

  _addNotification(message, level='success') {
    this._notificationSystem.addNotification({message, level});
  }

  /**
   * http://stackoverflow.com/a/32562118/3837223
   * https://facebook.github.io/react/docs/events.html#mouse-events
   */
  _handleAllEvents = (event) => {
    const eventType   = event.type;
    const targetClass = event.target.classList[0];

    // Ignore notification-system elements
    const r = new RegExp("notification")
    if (r.test(targetClass)) { return true; }
  }

  _setListener = (element) => {
    // console.log(`${element.classList[0]} was registered`)

    const onEnterHandler = (e) => {
      // console.log('onEnterHandler was invoked')
      e.target.style.backgroundColor = "#ff70ca";
      this._addNotification( `${e.target.classList[0]} was ${e.type}'ed` );
    }
    const onExitHandler = (e) => {
      // console.log('onExitHandler was invoked')
      e.target.style.backgroundColor = "#caff70";
      this._addNotification( `${e.target.classList[0]} was ${e.type}'ed` );
    }
    const options = {
      sensitivity: 7,   // in pixels
      interval   : 200, // in milliseconds
      timeout    : 400  // in milliseconds
    };
    const listener = new eventSensitivityControl(
      element,
      onEnterHandler,
      onExitHandler,
      options
    );

    return listener;
  }
}

export default RussianDoll;
