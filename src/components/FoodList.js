import React, { Component } from 'react';

import _ from 'lodash';

// import { database } from '../utils/firebase.js';

class FoodList extends Component {
  constructor() {
    super();

    this.state = {
      food: []
    }

    this._getFoodResults = this._getFoodResults.bind(this);
  }


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
      this._getNutrients(data.branded)
      this.setState({
        food: data.branded
      })
    })
  }


  //  _getNutrients(data) {
  //   console.log('this',data[0].nix_item_id);
  //   let nutrients = data.map((data, i) => {
  //     console.log(data.nix_item_id)
  //     return data.nix_item_id;
  //   })
  //   console.log(nutrients);
  // }

  _getNutrients(data) {
    let foodInfo = [];
    let nutrients = data.map((data, i) => {
      return data.nix_item_id;
    })
    let nix_id = nutrients;
    console.log(nix_id)
    // let doYaThang = nix_id.map((data, i) => {
    //   console.log('Data:', data);
    //   fetch(`/nutrients/${data}`, {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   })
    //   .then((res) => res.json())
    //   .then((responseData) => {
    //     foodInfo.push(responseData.foods[0].food_name);
    //   })
    //   this.setState({
    //     food: foodInfo
    //   })
    //   console.log('Food Info!', this.state.food)
    // })
  }

  render() {

    var mapped = this.state.food.map((data, i) => {
      let food = this.state.food[i];
      return (
        <div key={i} className="results">
          <h1>{_.startCase(food.food_name)}</h1>
          <p>Serving Size: {food.serving_qty} {food.serving_unit}</p>
          <p>Calories: {food.nf_calories}</p>
        </div>
      )
    })

    if (this.props.currentUser) {
      return (
        <div>
          <form className="searchForm" onSubmit={this._getFoodResults}>
            <label htmlFor="query">Search: </label>
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
