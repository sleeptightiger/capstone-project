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

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar">
              <h1 className="title">Nutrition App</h1>
              <NavLink className="navlink" exact to= '/'>Home</NavLink>
              <NavLink className="navlink" to= '/foodlist'>Food List</NavLink>
              <p className='navlink'>Login with Facebook</p>
            </nav>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route path="/foodlist" component={() => <FoodList />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
