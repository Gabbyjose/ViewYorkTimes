import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { OurMap, UserHome } from './components'
import { fetchArticles, filterData } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentWillMount() {
    this.props.loadInitialData()
      .then(articles => {
        console.log('THESE ARE THE ARTICLEZ', articles)
        this.props.filterArticlesByCountry(articles.articles.results)
      })
  }

  render() {

    return (
      <Switch>

        <Route path="/home" component={UserHome} />

      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    articles: state.articles
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
