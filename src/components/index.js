import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import '../App.css'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import inorout from './inorout/InOrOut'
import Userprofile from './protected/userprofile'
import { logout } from '../helpers/auth'
import firebase from '../config/firebase';
import { firebaseAuth } from '../config/firebase';


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
    : <Redirect to='/userprofile' />}
    />
  )
}

class App extends Component {

    state = {
        authed: false,
        loading: true,
    }

    componentDidMount(){
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              authed: true,
              loading: false,
            })
          } else {
            this.setState({
              authed: false,
              loading: false
            })
          }
        })

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
    componentWillUnmount () {
        this.removeListener()
      }

  render() {

    return this.state.loading === true ? <h1>Loading</h1> : (
        <BrowserRouter>
            <div>
              <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                  <div className="navbar-header">
                      <Link to="/" className="navbar-brand">Home</Link>

                  </div>
                  <ul className="nav navbar-nav pull-right">
                    <li>
                      <Link to="/userprofile" className="navbar-brand">User Profile</Link>
                    </li>
                    <li>
                      {this.state.authed
                        ? <button
                            style={{border: 'none', background: 'transparent'}}
                            onClick={() => {
                              logout()
                            }}
                            className="navbar-brand">Logout</button>
                        : <span>
                            <Link to="/login" className="navbar-brand">Login</Link>
                            <Link to="/register" className="navbar-brand">Register</Link>
                          </span>}
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="container">
                <div className="row">
                  <Switch>
                    <Route path='/' exact component={Home} />
                    <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                    <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                    <PrivateRoute authed={this.state.authed} path='/userprofile' component={Userprofile} />
                    <PrivateRoute authed={this.state.authed} path='/inorout' component={Inorout} />
                    <Route render={() => <h3>No Match</h3>} />
                  </Switch>
                </div>
              </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
