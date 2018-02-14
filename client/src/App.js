import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const isProduction = () => {
  return !window.location.href.match('localhost');
};

class App extends Component {
  async componentDidMount() {
    const domain = isProduction() ?
      'https://peaceful-mesa-81349.herokuapp.com/' :
      'http://localhost:3001';

    let response, json;
    response = await fetch(`${ domain }/api/v1/session`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors'
    });
    json = await response.json();
    console.log(json);

    response = await fetch(`${ domain }/api/v1/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: 'foobar-' + new Date().getTime().toString().split('').map(c => String.fromCharCode(c % 97 + 97)).join('')
      })
    });
    json = await response.json();
    console.log(json);

    response = await fetch(`${ domain }/api/v1/messages`, {
      credentials: 'include',
      mode: 'cors'
    });
    json = await response.json();
    console.log(json);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
