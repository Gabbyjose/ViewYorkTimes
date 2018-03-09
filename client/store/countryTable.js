import { getCountryCode } from "./helperFuncs";

const FILTER_ARTICLES = 'FILTER_ARTICLES';

const filterArticles = countryTable => ({
  type: FILTER_ARTICLES,
  countryTable
})



export const filterData = articles =>
  dispatch => {
    const hashTable = {};
    if (!articles) return
    if (!articles.length) return
    for (let i = 0; i < articles.length; i++) {

      for (let j = 0; j < articles[i].geo_facet.length; j++) {
        //instead of adding a number for each time a country appears, i added an array that keeps the title of the section they appear in, then to get the number of times a country appears, we just get the length of the array

        if (hashTable.hasOwnProperty(articles[i].geo_facet[j])) {
          hashTable[articles[i].geo_facet[j]].push(articles[i].section)
        } else {
          hashTable[articles[i].geo_facet[j]] = [articles[i].section];
        }
      }
    }
    let data = []

    for (var key in hashTable) {
      if (hashTable.hasOwnProperty(key)) {
        let currentCountry = getCountryCode(key)
        currentCountry.value = hashTable[key].length
        currentCountry.sections = hashTable[key]
        data.push(currentCountry)
      }
    }
    dispatch(filterArticles(data))
  }


export default function (state = {}, action) {
  switch (action.type) {
    case FILTER_ARTICLES:
      return action.countryTable
    default:
      return state
  }
}
