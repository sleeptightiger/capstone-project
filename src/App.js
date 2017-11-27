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
import LoginButton from './components/account/LoginButton';
import LogoutButton from './components/account/LogoutButton';


import { auth } from './utils/firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged(newUser => {
      if (newUser) {
        this.setState({
          currentUser: newUser
        });
        console.log('Logged in', newUser);
      } else {
        this.setState({
          currentUser: null
        });
        console.log('logged out');
      }
    });
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
              <LoginButton />
              <LogoutButton />


            </nav>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route path="/foodlist" component={() => <FoodList currentUser={this.state.currentUser}/>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
