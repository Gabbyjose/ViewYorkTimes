import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ARTICLES = 'GET_ARTICLES'

// /**
//  * ACTION CREATORS
//  */
const getArticles = articles => ({type: GET_ARTICLES, articles})


export const fetchArticles = () =>
  dispatch =>
    axios.get('/api/topstories')
      .then(body => dispatch(getArticles(body.data)))
      .catch(err => console.log(err))

export default function (state = [], action) {
  switch (action.type) {
   case GET_ARTICLES:
      return action.articles
    default:
      return state
  }
}
