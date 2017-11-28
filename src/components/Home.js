import React, { Component } from 'react';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      food: []
    }
  }


  componentDidMount() {
    fetch('/natural', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
  }




  render() {
    return (
      <div>
        <h1>Home</h1>
        <form onSubmit={this._plsWork} method="POST">
          <input type="text" />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Home;
