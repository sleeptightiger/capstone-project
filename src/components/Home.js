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

    axios.get(`https://numvalidate.com/api/validate?number=${this.phoneNumber.value}&countryCode=US`)
    .then((res) => {
      if (!res.data.data.valid) {
        alert('Invalid Phone Number');
      }
    })
    .then(() => {
      axios.get(`/api/twilio/${this.phoneNumber.value}`)
      .then((res) => {
        console.log('SMS sent successfully.');
      })
      this.phoneNumber.value = ''
    })
    .catch((err) => {
      new Error('error', err);
    })
  }

  render() {
    return (
      <div className="home">
        <h1>Login and track your macros!</h1>
        <h1>Enter your phone number to get fitness updates</h1>
        <form onSubmit={this._getPhoneNumber} className="numform">
          <div id="input_wrapper">
            <p>
              <label htmlFor="login">Phone Number</label>
              <i className="icon icon-user icon-large fa-phone"></i>
              <input type="text" name="login" id="login" placeholder="Phone Number" ref={(input) => this.phoneNumber = input} />
            </p>
          </div>
            <p>
              <input type="submit" id="log-in" name="log-in" value="Submit" />
            </p>
          </form>
      </div>
    );
  }
}

export default Home;
