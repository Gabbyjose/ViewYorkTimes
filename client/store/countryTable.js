
const FILTER_ARTICLES = 'FILTER_ARTICLES';

const filterArticles = countryTable => ({
  type: FILTER_ARTICLES,
  countryTable
})


export const filterData = articles =>
dispatch => {
  console.log('test', articles);
  const hashTable = {};
  for (let i = 0; i < articles.length; i++){
    for (let j = 0; j < articles[i].geo_facet.length; j++){
      if (hashTable.hasOwnProperty(articles[i].geo_facet[j])) {
        hashTable[articles[i].geo_facet[j]]++;
      }
      else {
        hashTable[articles[i].geo_facet[j]] = 1;
      }
    }
  }
  dispatch(filterArticles(hashTable))
}


export default function (state = {}, action){
  switch (action.type) {
    case FILTER_ARTICLES:
      return action.countryTable
    default:
      return state
  }
}
