import { getCountryCode } from './helperFuncs';

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
        let country = getCountryCode(articles[i].geo_facet[j])
        let imageUrl = 'https://media.giphy.com/media/H54R9ULqkR5bG/giphy.gif'
        if (articles[i].multimedia[2]){
          imageUrl = articles[i].multimedia[2].url
        }
        if (hashTable.hasOwnProperty(country.name)) {

          hashTable[country.name].push({name: articles[i].title, link: articles[i].url, imageUrl: imageUrl})
        } else {
          hashTable[country.name] = [{name: articles[i].title, link: articles[i].url, imageUrl: imageUrl}];
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
