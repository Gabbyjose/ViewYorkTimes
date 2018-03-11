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

  renderMap() {
    if (!this.props.countryTable) return
    Highcharts.mapChart('mapid', {
      title: {
        text: ''
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        color: 'red',
        min: 1,
        max: 10,
        type: 'linear'
      },

      tooltip: {
        formatter: function () {

          return '<b>' + this.point.name + '</b><br>' + '<b>Articles:</b>' + this.point.sections.length;
        },
        backgroundColor: '#99bfaa',
      },

      plotOptions: {
        series: {
          point: {
            events: {
              click: function(el) {
                // const text = el.point.sections;
                // if (!this.series.chart.clickLabel) {
                //   this.series.chart.clickLabel = this.series.chart.renderer.label(text, 0, 400)
                //     .css({
                //       width: '500px'
                //     })
                //     .add();
                // } else {
                //   this.series.chart.clickLabel.attr({
                //     text: text
                //   });
                // }
                location.href = `/${el.point.code}`
              }
            }
          }
        }
      },

      series: [{

        data: this.props.countryTable,
        mapData: Highcharts.maps['custom/world'],
        joinBy: ['iso-a2', 'code'],
        name: '<b>New York Times Mentions</b>',
        borderColor: '#000',
        borderWidth: 0.2,
        states: {
          hover: {
            borderWidth: 1,
            color: '#6288a5'
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
        <p> Your easiest way to see where the biggest news is happening everyday around the world </p>

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
