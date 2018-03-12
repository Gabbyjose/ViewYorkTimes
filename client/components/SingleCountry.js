import React from 'react';
import { connect } from 'react-redux'

const SingleCountry = props => {
    return (
      props.name ?
      <div className="singleCountry">
        <h2> The News Today In: {props.name}</h2>
        <div>
          {
            props.singleCountryData && props.singleCountryData.map(country =>
              (<div key={country.link} className="singleArticle">

                <a href={country.link}><h3>{country.name}</h3>

                <img src={country.imageUrl} />
                </a>
                <br />
              </div>)
          )}

        </div>
      </div>
      :
        <h2>Check back tomorrow for news on this country!</h2>

    )

}

const mapState = (state, ownProps) => {
  const countryCode = ownProps.match.params.country
  let currentCountryArticles;
  let currentCountryName;
  for (let key in state.countryTable){
    if (state.countryTable[key].code == countryCode){
      currentCountryArticles = state.countryTable[key].sections;
      currentCountryName = state.countryTable[key].name

    }
  }

  return {
    articles: state.articles.results,
    countryTable: state.countryTable,
    countryCode: countryCode,
    singleCountryData: currentCountryArticles,
    name: currentCountryName,
  }
}

export default connect(mapState, null)(SingleCountry)
