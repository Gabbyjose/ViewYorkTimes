import { getCountryCode } from './helperFuncs';

const FILTER_ARTICLES = 'FILTER_ARTICLES';

const filterArticles = countryTable => ({
  type: FILTER_ARTICLES,
  countryTable
})

const filterInitialData = (articles) => {
  let hashTable = {};
  for (let i = 0; i < articles.length; i++) {
    for (let j = 0; j < articles[i].geo_facet.length; j++) {
      let country = getCountryCode(articles[i].geo_facet[j])
      let imageUrl = 'https://media.giphy.com/media/H54R9ULqkR5bG/giphy.gif'
      if (articles[i].multimedia[4]){
        imageUrl = articles[i].multimedia[4].url
      }
      if (hashTable.hasOwnProperty(country.name)) {

        hashTable[country.name].push({name: articles[i].title, link: articles[i].url, imageUrl: imageUrl})
      } else {
        hashTable[country.name] = [{name: articles[i].title, link: articles[i].url, imageUrl: imageUrl}];
      }
    }
  }
  return hashTable;
}

export const filterData = articles =>
  dispatch => {
    if (!articles) return
    if (!articles.length) return

    let hashTable = filterInitialData(articles)
    let data = []

    for (let key in hashTable) {
      if (hashTable.hasOwnProperty(key)) {
        let newArticleArray = []
        for (let i = 0; i < hashTable[key].length; i++){
          if (newArticleArray.find(el => el.name === hashTable[key][i].name)) {continue;}
          else {
            newArticleArray.push(hashTable[key][i])
          }
        }

        let currentCountry = getCountryCode(key)
        currentCountry.value = newArticleArray.length
        currentCountry.sections = newArticleArray
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
