import React, { Component } from 'react';


import _ from 'lodash';


class MyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
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
      setTimeout(() => {
        this._activeDate();
      }, 800)

  }

  _activeDate() {
    let dayOfWeek = new Date();
    dayOfWeek = dayOfWeek.getDay();
    dayOfWeek += 1;
    let dayElement = document.querySelector(`.days > li:nth-child(${dayOfWeek})`);
    dayElement.classList.add("activeDay");
  }



  render() {


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
          <div>
            <p>Data here</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MyList;
