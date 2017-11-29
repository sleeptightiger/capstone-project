import React, { Component } from 'react';

import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {


    }

    this._getPhoneNumber = this._getPhoneNumber.bind(this);
  }




  _getPhoneNumber(e) {
    e.preventDefault();
    // console.log(this.phoneNumber.value)
    axios.get(`/api/twilio/${this.phoneNumber.value}`)
    .then((res) => {
      console.log(res);
    })


  }




  render() {
    return (
      <div>
        <h1>Login and track your macros!</h1>
        <form onSubmit={this._getPhoneNumber}>
          <h1>Enter your phone number to get fitness updates</h1>
          <input type="text" ref={(input) => this.phoneNumber = input}/>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Home;
