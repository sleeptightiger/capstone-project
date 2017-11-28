import React, { Component } from 'react';

import _ from 'lodash';

import { database } from '../utils/firebase.js';

class FoodList extends Component {
  constructor() {
    super();

    this.state = {
      food: []
    }

    this._getFoodResults = this._getFoodResults.bind(this);
  }


  // componentDidMount() {
  //   this.ref = database.ref('/foodlist');
  //   fetch('/food/beef', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     this.setState({
  //       food: data.common
  //     })
  //   })
  // }

  _getFoodResults(e) {
    e.preventDefault();
    let searchTerm = this.inputBox.value
    fetch(`/food/${searchTerm}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        food: data.branded
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
          <form onSubmit={this._getFoodResults}>
            <label for="query">Search: </label>
            <input type="text" name="query" ref={(input) => this.inputBox = input}/>
            <input type="submit" value="submit" />
          </form>
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
