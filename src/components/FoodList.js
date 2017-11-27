import React, { Component } from 'react';

import _ from 'lodash';

import { database } from '../utils/firebase.js';

class FoodList extends Component {
  constructor() {
    super();

    this.state = {
      food: []
    }
  }


  componentDidMount() {
    this.ref = database.ref('/foodlist');
    fetch('/food/beef', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        food: data.common
      })
    })
  }



  render() {

    var mapped = this.state.food.map((data, i) => {
      let food = this.state.food[i];
      return (
        <div>
          <h1>Name: {_.startCase(food.food_name)}</h1>
          <p>Serving Size: {food.serving_qty} {food.serving_unit}</p>
        </div>
      )
    })

    if (this.props.currentUser) {
      return (
        <div>
          {mapped}
        </div>
      );
    }
    else {
      return (
        <div>
          <h1>You are not authorized to view this page.</h1>
        </div>
      );
    }



  }
}

export default FoodList;
