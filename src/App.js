import React, { Component } from 'react';
import './components/Home.css';

// Google Analytics
import ReactGA from 'react-ga';



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
      currentUserUID: null,
      currentDay: '' || 'Sunday',
    };

    this._activeDate = this._activeDate.bind(this);
  }

  componentDidMount() {
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
    this._activeDate();

    ReactGA.initialize('UA-28151241-8');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }




  _toggleAuthButton() {
    if (this.state.currentUser) {
      return <LogoutButton />
    }
    else {
      return <LoginButton />
    }
  }

  _activeDate() {
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      let dayOfWeek = new Date();
      dayOfWeek = dayOfWeek.getDay();
      this.setState({
        currentDay: days[dayOfWeek],
        currentDayInt: dayOfWeek
      })

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
              <Route exact path="/" component={() => <Home currentUser={this.state.currentUser} />} />
              <Route path="/foodlist" component={() => <FoodList currentUserUID={this.state.currentUserUID} currentUser={this.state.currentUser} currentDay={this.state.currentDay}/>} />
              <Route path="/mylist" component={() => <MyList currentUserUID={this.state.currentUserUID} currentUser={this.state.currentUser} currentDay={this.state.currentDay} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
