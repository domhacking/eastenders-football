THIS IS NOT NEEDED

import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import './App.css';
import firebase from './config/firebase';
import { firebaseAuth } from './config/firebase';



class App extends Component {

    constructor(){
        super();
        this.state = {
            players : [],
            user: null
        }
    }


    componentDidMount(){
        const playerList = firebase.database().ref('hkxsport');
        let newState = [];

        playerList.on('value', (snapshot) => {
            let players = snapshot.val();
            for (let player in players) {
                newState.push({
                    id: player,
                    playername: players[player].playername,
                    gameswon: players[player].gameswon
                });
            }

            this.setState({
                players: newState
              });
        });
    }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div className="wrapper">
            <ul>
              {this.state.players.map((player) => {
                return (
                  <li key={player.id}>
                    <h3>{player.playername}</h3>
                    <p>{player.gameswon}</p>
                  </li>
                )
              })}
            </ul>
          </div>
      </div>
    );
  }
}

export default App;
