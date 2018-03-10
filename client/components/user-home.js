import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchArticles, filterData } from '../store'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props);
    this.renderMap = this.renderMap.bind(this)

  }

  componentWillMount() {
    this.props.loadInitialData()
      .then(articles => {
        this.props.filterArticlesByCountry(articles.results)
      })
      .then(() => this.renderMap())
  }

  renderMap(){
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
          return '<b>' + this.point.name + '</b><br>' + this.point.sections;
        }
      },

      series: [{

        data: this.props.countryTable,
        mapData: Highcharts.maps['custom/world'],
        joinBy: ['iso-a2', 'code'],
        name: '<b>New York Times Mentions</b>',
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
      <div>
        <h1> View Your Times </h1>
      </div>
    )
  }

  render() {

    return (
      <div>
        <h3>Welcome! </h3>
        {
        //   this.props.articles && this.props.articles.length && this.props.articles.map(el => (
        //   <div key={this.props.articles.indexOf(el)}>
        //     <h3>{el.section}</h3>
        //     <p>{el.title}</p>
        //   </div>
        // ))
      }
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
    loadInitialData() {
      return dispatch(fetchArticles())
    },
    filterArticlesByCountry(obj) {
      return dispatch(filterData(obj))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)
