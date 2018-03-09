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

    Highcharts.mapChart('mapid', {
      title: {
        text: 'Map border options'
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        min: 1,
        max: 1000,
        type: 'logarithmic'
      },

      series: [{
        data: this.props.countryTable,
        mapData: Highcharts.maps['custom/world'],
        joinBy: ['iso-a2', 'code'],
        name: 'Population density',
        borderColor: 'black',
        borderWidth: 0.2,
        states: {
          hover: {
            borderWidth: 1
          }
        },
        tooltip: {
          valueSuffix: '/km²'
        }
      }]
    });

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
