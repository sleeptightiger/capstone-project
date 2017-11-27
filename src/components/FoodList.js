import React, { Component } from 'react';

import _ from 'lodash';

class FoodList extends Component {
  constructor() {
    super();

    this.state = {
      food: []
    }
  }


componentDidMount() {
  fetch('/food/chicken', {
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


    return (
      <div>
        <h1>Data</h1>
        {mapped}
      </div>
    );
  }
}

export default FoodList;
