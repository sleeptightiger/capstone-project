import React, { Component } from 'react';

import _ from 'lodash';

import axios from 'axios'

// import { database } from '../utils/firebase.js';

class FoodList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: []
    }

    this._getFoodResults = this._getFoodResults.bind(this);
    this._addItem = this._addItem.bind(this);
    this._getNaturalResults = this._getNaturalResults.bind(this);
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currentUserUID !== nextProps.currentUserUID) {
      return true;
    }
    if (this.state.food !== nextState.food) {
      return true;
    }
    return false;
  }

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
      fetch(`/api/${fetchUrl}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log('Data', data)
        // this._getNutritionInfoId(data.branded)
        this.setState({
          food: data
        })
      })
    }
    else {
      fetch(`/api/instantSearch/${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            food: data.branded
          })
        })
    }

  }

  _getNaturalResults(e) {
    e.preventDefault();

    let ingredients = this.naturalSearch.value;
    console.log(ingredients)
    axios.get(`/api/natural/${ingredients}`)
    .then((res) => {
      console.log('API Natural Response', res.data.foods);
      this.setState({
        food: res.data.foods
      })
    })


  }

  _addItem(e) {
    let surroundingDiv = e.target.parentNode.parentNode.childNodes

    let storedValues = []
    surroundingDiv.forEach((element) => {
      // console.log(element.textContent)
      storedValues.push(element.textContent)
    })

    let parsedValues = []
    parsedValues.push(storedValues[0]);
    let unitString = JSON.stringify(storedValues[1].split(':').splice(1,1));
    unitString = unitString.split(' ');
    parsedValues.push(unitString[1]);
    parsedValues.push(unitString[2].replace(/"]/i, ''));

    for (let i = 2; i < storedValues.length; i++) {
      let addString = storedValues[i].split(': ')
      parsedValues.push(addString[1]);
    }
    let dayOfWeek = new Date();
    dayOfWeek = dayOfWeek.getDay();
    axios.post('/api/foodList', {
      data: parsedValues,
      userID: this.props.currentUserUID,
      dayOfWeek: dayOfWeek
    })
    .then((res) => {
      console.log('submitted successfully');
    })
    .catch((err) => {
      console.log('error while posting', err);
    })

  }

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
          <h1>{_.startCase(food.food_name)}<i onClick={this._addItem} className="fa fa-plus" aria-hidden="true"></i></h1>
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
            <h1>Search any food!</h1>
            <input type="text" name="query" ref={(input) => this.searchBox = input}/>
            <input type="submit" value="Get Data" />
          </form>
          <form className="searchForm" onSubmit={this._getNaturalResults}>
            <h1>Natural Search</h1>
            <h2>Try queries like:</h2>
            <h3>"for breakfast i ate 2 eggs, bacon, and french toast"</h3>
            <input type="text" ref={(input) => this.naturalSearch = input} />
            <input type="submit" value="Submit!" />
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
