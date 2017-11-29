import React, { Component } from 'react';


import _ from 'lodash';


class MyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }

  }


  componentDidMount() {
    fetch(`/foodList/${this.props.currentUserUID}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        data
      })
    })

  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currentUserUID !== nextProps.currentUserUID) {
      return true;
    }
    if (this.state.data !== nextState.data) {
      return true;
    }
    return false;
  }



  // _activeDate() {
  //   let dayOfWeek = new Date();
  //   dayOfWeek = dayOfWeek.getDay();
  //   dayOfWeek += 1;
  //   let dayElement = document.querySelector(`.days li:nth-child(${dayOfWeek})`);
  //   dayElement.classList.add("activeDay");
  //   // dayElement.setAttribute('class', 'activeDay')
  // }

  //   _activeDate() {
  //     var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  //     let dayOfWeek = new Date();
  //     dayOfWeek = dayOfWeek.getDay();
  //     this.setState({
  //       day: days[dayOfWeek]
  //     })
  // }



  _calculateMacros() {
    let data = this.state.data;
    let totalValues = {};
    let totalCal = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalProtein = 0;
    if (data) {
      data.forEach((value) => {
        totalCal += value.calories;
        totalCarbs += value.carbohydrates;
        totalFat += value.fat;
        totalProtein += value.protein;
      })


      let totalCalCarbs = totalCarbs * 4;
      let totalCalFat = totalFat * 9;
      let totalCalProtein = totalProtein * 4;

      totalValues = {
        calories: totalCal,
        carbs: totalCarbs,
        fat: totalFat,
        protein: totalProtein,
        totalCalCarbs,
        totalCalFat,
        totalCalProtein
      }
    }
    return totalValues;
  }


  // componentWillUnmount() {
  //   let lists = document.querySelector('li');
  //   console.log(lists);

  //   lists.classList.remove('activeDay');
  //   console.log(lists);

  // }



  render() {

    let calculatedMacros = this._calculateMacros();

    if (!this.state.data) {
      return (<div><h1>Loading..</h1></div>);
    }
    else {
      var infoMapped = this.state.data.map((element, i) => {
        let nutInfo = this.state.data[i];

        return (
          <div key={i} className="results">
            <h1>{_.startCase(nutInfo.name)}</h1>
            <p>Serving Size: {nutInfo.servingSize} {nutInfo.unit}</p>
            <p>Calories: {nutInfo.calories || 0}</p>
            <p>Protein: {nutInfo.protein|| 0}</p>
            <p>Carbohydrates: {nutInfo.carbohydrates || 0}</p>
            <p>Fat: {nutInfo.fat || 0}</p>
          </div>
        )
      })
      this._calculateMacros();
    }




    if (!this.props.currentUser) {
      return (
        <div>
          <h1>You are not authorized to view this page.</h1>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="left">
          {infoMapped}
        </div>
        <div className="right">
          <div>
            <ul className="days">
              <li>Sunday</li>
              <li>Monday</li>
              <li>Tuesday</li>
              <li>Wednesday</li>
              <li>Thursday</li>
              <li>Friday</li>
              <li>Saturday</li>
            </ul>
          </div>
          <p>{this.props.currentDay} Daily Totals</p>
          <div className="totals">
            <p>Total Fat: <span className="calcValues">{calculatedMacros.fat} grams</span></p>
            <p>Total Carbohydrates: <span className="calcValues">{calculatedMacros.carbs} grams</span></p>
            <p>Total Protein: <span className="calcValues">{calculatedMacros.protein} grams</span></p>
            <p>Total Calories: <span className="calcValues">{calculatedMacros.calories} calories</span></p>
            <p>Total Calories from Fat: <span className="calcValues">{calculatedMacros.totalCalFat} calories</span></p>
            <p>Total Calories from Carbohydrates: <span className="calcValues">{calculatedMacros.totalCalCarbs} calories</span></p>
            <p>Total Calories from Protein: <span className="calcValues">{calculatedMacros.totalCalProtein} calories</span></p>
          </div>
        </div>
      </div>
    );
  }
}

export default MyList;
