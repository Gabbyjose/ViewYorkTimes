import React, { Component } from 'react'

import { connect } from 'react-redux'
import { fetchArticles, filterData } from '../store'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props);
    console.log(props)

  }

  componentWillMount() {
    this.props.loadInitialData()
      .then(articles => {
        this.props.filterArticlesByCountry(articles.results)
      })
  }

  render() {

    console.log('Our articles in component', this.props.articles, 'and our table', this.props.countryTable)

    return (
      <div>
        <h3>Welcome! </h3>
        {this.props.articles && this.props.articles.length && this.props.articles.map(el => (
          <div key={this.props.articles.indexOf(el)}>
            <h3>{el.section}</h3>
            <p>{el.title}</p>
          </div>
        ))}
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
