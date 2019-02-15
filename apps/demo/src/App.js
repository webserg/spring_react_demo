import React, { Component } from 'react';
import './App.css';
import Counter from './Counter'
import ShowUsers from './ShowUsers'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Demo React.js on Spring</h1>
        </header>
        <p className="App-intro">
          This project is a demo example for <a href="">Spring and React.js: the easy way</a>
        </p>
          <Counter/>
          <ShowUsers/>
      </div>
    );
  }
}

export default App;
