import React, { Component } from 'react';

import { auth } from '../../utils/firebase';

class LogoutButton extends Component {

  _handleLogout() {
    auth.signOut();
  }

  render() {
    return (
      <div>
        <p onClick={this._handleLogout}>Logout</p>
      </div>
    )
  }
}

export default LogoutButton;
