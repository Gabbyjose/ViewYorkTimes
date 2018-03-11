import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class SingleCountry extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      this.props.name ?
      <div className="singleCountry">
        <h2> Da News 4: {this.props.name}</h2>
        <div>

          {
            this.props.singleCountryData && this.props.singleCountryData.map(country =>
              <div key={country.link}>
              <img src={country.imageUrl}/>
              <br />
              <a href={country.link}>{country.name}</a>
              <br />
              </div>
          )}

        </div>
      </div>
      :
        <h2>Check back tmrw for news on this country!</h2>

    )
  }
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
