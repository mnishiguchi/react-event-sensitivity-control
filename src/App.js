import React, { Component } from 'react';
import RussianDoll from './components/RussianDoll';
require('./App.css');

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>
            React russian doll event detection
            <br />
            <small>with event-sensitivity control</small>
          </h2>
        </div>
        <div className="App-intro">

          <RussianDoll />

        </div>
      </div>
    );
  }
}

export default App;
