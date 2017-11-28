import React, { Component } from 'react';

import _ from 'lodash';

// import { database } from '../utils/firebase.js';

class FoodList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: []
    }

    this._getFoodResults = this._getFoodResults.bind(this);
  }


  _getFoodResults(e) {
    e.preventDefault();
    let searchTerm = this.searchBox.value
    fetch(`/instantSearch/${searchTerm}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.branded)
      this._getNutritionInfoId(data.branded)
      this.setState({
        food: data.branded
      })
    })
  }


   _getNutritionInfoId(data) {
    let nutritionInfoId = data.map((data, i) => {
      return data.nix_item_id;
    })
    console.log(nutritionInfoId);
  }

  // _getNutrients(data) {
  //   let foodInfo = [];
  //   let nutrients = data.map((data, i) => {
  //     return data.nix_item_id;
  //   })
  //   let nix_id = nutrients;
  //   // console.log(nix_id)
  //   let doYaThang = nix_id.map((data, i) => {
  //     // console.log('Data:', data);
  //     fetch(`/nutrients/${data}`, {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     })
  //     .then((res) => res.json())
  //     .then((responseData) => {
  //       // console.log(responseData.foods[0].food_name)
  //       foodInfo.push(responseData.foods[0].food_name);
  //       return responseData.foods[0].food_name;
  //     })
  //   })
  //   this.setState({
  //     food: foodInfo
  //   })
  //   console.log('Doya', doYaThang)
  //   console.log('Food Info!', this.state.food)
  // }

  render() {

    var mapped = this.state.food.map((data, index) => {
      let food = this.state.food[index];
      return (
        <div key={index} className="results">
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
            <input type="text" name="query" ref={(input) => this.searchBox = input}/>
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
