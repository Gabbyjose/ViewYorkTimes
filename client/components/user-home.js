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

      //the formatter function is how to get info off of the data point, play around with it!
      tooltip: {
        formatter: function () {
          // just prints the number of articles that country appears in.
          // then we can use the click to list out the articles with da links
          return '<b>' + this.point.name + '</b><br>' + '<b>Articles:</b>' + this.point.sections.length;
        },
        backgroundColor: '#99bfaa',
      },
      // working on getting this to show something on click. hopefully
      // list out all the articles that it's appeared in
      // can we link them together??
      plotOptions: {
        series: {
          events: {
            click: (el) => {
              console.log(el.point.sections)
              const text = 'this prints a thing!'
              if (!this.mapChart.clickLabel) {
                this.mapChart.clickLabel = this.mapChart.renderer.label(text, 0, 250)
                  .css({
                    width: '180px'
                  })
                  .add();
              } else {
                this.mapChart.clickLabel.attr({
                  text: text
                });
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
