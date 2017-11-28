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


  // _getFoodResults(e) {
  //   e.preventDefault();
  //   let searchTerm = this.searchBox.value
  //   fetch(`/instantSearch/${searchTerm}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data.branded)
  //     this._getNutritionInfoId(data.branded)
  //     this.setState({
  //       food: data.branded
  //     })
  //   })
  // }


  _getFoodResults(e) {
    e.preventDefault();
    let searchTerm = this.searchBox.value
    if (searchTerm === 'chicken' || searchTerm === 'beef' || searchTerm === 'ground beef') {
      let fetchUrl = '';
      if (searchTerm === 'chicken') {
        fetchUrl = 'chickenList'
      }
      if (searchTerm === 'beef' || searchTerm === 'ground beef') {
        fetchUrl = 'beefList'
      }
      fetch(`/${fetchUrl}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Data', data)
        // this._getNutritionInfoId(data.branded)
        this.setState({
          food: data
        })
      })
    }
    else {
      fetch(`/instantSearch/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            food: data.branded
          })
        })
    }

  }


  // _getNutritionInfoId(data) {
  //   let nutritionInfoId = data.map((data, i) => {
  //     return data.nix_item_id;
  //   })
  //   console.log(nutritionInfoId);
  // }


  render() {

    var mapped = this.state.food.map((data, index) => {
      let food = this.state.food[index];
      for (var key in food) {
        if (food.hasOwnProperty(key)) {
          if (food[key] === null) {
            food[key] = 0;
          }
        }
      }
      return (
        <div key={index} className="results">
          <h1>{_.startCase(food.food_name)}</h1>
          <p>Serving Size: {food.serving_qty} {food.serving_unit}</p>
          <p>Calories: {food.nf_calories || 0}</p>
          <p>Protein: {food.nf_protein || 0}</p>
          <p>Carbohydrates: {food.nf_total_carbohydrate || 0}</p>
          <p>Fat: {food.nf_total_fat || 0}</p>

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
