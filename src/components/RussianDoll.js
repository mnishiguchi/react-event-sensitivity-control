import React, { Component } from 'react';

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
    return (
      <section
        className="RussianDoll"
        onClick={e => this._handleAllEvents(e)}
        onDoubleClick={e => this._handleAllEvents(e)}
        onMouseOver={e => this._handleAllEvents(e)}
        onMouseLeave={e => this._handleAllEvents(e)}
      >

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


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    this._registerListeners([
      '.RussianDoll',
      '.B1',
      '.B2',
      '.bottom1',
      '.bottom2',
    ]);
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => {
      listener.remove();
    })
    this._listeners = [];
  }


  // ---
  // PRIVATE METHODS
  // ---


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

  _registerListeners = (selectors) => {
    this._listeners = [];
    selectors.forEach(selector => {
      const element = document.querySelector(selector);
      this._listeners.push( this._setListener( element ) );
    });
  }

  _setListener = (element) => {
    // console.log(`${element.classList[0]} was registered`)
    const {
      onEnterHandler,
      onExitHandler,
      options
    } = this.props;

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
