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
    auth.signInWithRedirect(provider);
  }

  render() {
    return (
      <div className="facebook">
        <p onClick={this._handleFacebook}><i className="fa fa-facebook" aria-hidden="true"></i>Login</p>
      </div>
    )
  }
}

export default LoginButton;
