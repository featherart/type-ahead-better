import React, { Component } from 'react'
import TypeAhead from './TypeAhead'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to Stuff I Learned, Part Deux</h1>
          <h3>RxJs 6.0 patterns</h3>
        </header>
        <div className='app-container'>
          <div className='search-container'>
            <TypeAhead />
          </div>
        </div>
      </div>
    );
  }
}

export default App
