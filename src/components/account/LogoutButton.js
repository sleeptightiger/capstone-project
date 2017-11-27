import React, { Component } from 'react';

import { auth } from '../../utils/firebase';

class LogoutButton extends Component {

  _handleLogout() {
    auth.signOut();
  }

  render() {
    return (
      <a className="navlink" onClick={this._handleLogout}>Logout</a>
    )
  }
}

export default LogoutButton;
