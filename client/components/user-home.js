import React from 'react'

import {connect} from 'react-redux'
import {fetchArticles} from '../store'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const articles = props.articles || []
  console.log('Our articles in component',articles)

  return (
    <div>
      <h3>Welcome! </h3>
      {articles.length && articles.map(el => (
          <div>
            <h3>{el.section}</h3>
            <p>{el.title}</p>
          </div>
          ))}
    </div>
  )
}

const mapState = (state) => {
  return {
    articles: state.articles.results
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArticles () {
      dispatch(fetchArticles())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)


// {articles.length && articles.results.map(el => (
//   <div>
//     <h3>{el.section}</h3>
//     <p>{el.title}</p>
//   </div>
//   ))}
