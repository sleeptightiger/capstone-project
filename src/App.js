import React, { Component } from 'react';
import './components/Home.css';



import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';


import Home from './components/Home';
import FoodList from './components/FoodList';
import MyList from './components/MyList';
import LoginButton from './components/account/LoginButton';
import LogoutButton from './components/account/LogoutButton';


import { auth } from './utils/firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      currentUserUID: null
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged(newUser => {
      if (newUser) {
        this.setState({
          currentUser: newUser,
          currentUserUID: newUser.uid
        });
        console.log('Logged in');
      } else {
        this.setState({
          currentUser: null
        });
        console.log('logged out');
      }
    });
  }




  _toggleAuthButton() {
    if (this.state.currentUser) {
      return <LogoutButton />
    }
    else {
      return <LoginButton />
    }
  }






  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar">
              <h1 className="title">Nutrition App</h1>
              <NavLink className="navlink" exact to= '/'>Home</NavLink>
              <NavLink className="navlink" to= '/foodlist'>Food List</NavLink>
              <NavLink className="navlink" to= '/mylist'>My List</NavLink>
              {this._toggleAuthButton()}
            </nav>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route path="/foodlist" component={() => <FoodList currentUserUID={this.state.currentUserUID} currentUser={this.state.currentUser}/>} />
              <Route path="/mylist" component={() => <MyList currentUserUID={this.state.currentUserUID} currentUser={this.state.currentUser}/>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
