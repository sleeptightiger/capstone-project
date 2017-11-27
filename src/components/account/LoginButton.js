import React, { Component } from 'react';

import {firebase, auth} from '../../utils/firebase';

class LoginButton extends Component {

  // _handleClick(e) {
  //   e.preventDefault();
  //   const provider = new firebase.auth.GithubAuthProvider();
  //   auth.signInWithPopup(provider);
  // }

  // _handleGoogle(e) {
  //   e.preventDefault();
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   auth.signInWithPopup(provider);
  // }

  _handleFacebook(e) {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  }

  render() {
    return (
      <div>
        <p className="navlink" onClick={this._handleFacebook}>Facebook Login</p>
      </div>
    )
  }
}

export default LoginButton;
