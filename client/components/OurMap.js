import React, { Component } from 'react';
import { connect } from 'react-redux'
// Load Highcharts
// const Highcharts = require('highcharts');

// Load a module
// require('highcharts/modules/map')(Highcharts);
// const maps = require('../../server/world-palestine-highres.geo.json');
//const Highlight = require('react-highlight');
export class OurMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: true,
    }
  }
  render() {

    console.log(this.props)
    if (!this.props.countryTable) return
    Highcharts.mapChart('mapid', {
      plotOptions: {
        color: 'red'
      },
      title: {
        text: 'View Your Times'
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        min: 1,
        max: 15,
        type: 'linear'
      },

      //the formatter function is how to get info off of the data point, play around with it!
      tooltip: {
        formatter: function () {
          return 'The point name is ' + this.point.name + ' and the sections it appeared in are:  ' + this.point.sections;
        }
      },

      series: [{

        data: this.props.countryTable,
        mapData: Highcharts.maps['custom/world'],
        joinBy: ['iso-a2', 'code'],
        name: 'New York Times Mentions',
        borderColor: 'black',
        borderWidth: 0.2,
        states: {
          hover: {
            borderWidth: 1,
            color: 'red'
          }
        },
      }]
    })


    return (
      <div >
        <h1> Hello World </h1>
      </div>
    )
  }

}


const mapState = (state) => {
  return {
    articles: state.articles.results,
    countryTable: state.countryTable
  }
}

const mapDispatch = (dispatch) => {
  return {
    // filterArticlesByCountry (obj) {
    //   dispatch(filterData(obj))
  }
}

export default connect(mapState, mapDispatch)(OurMap)
