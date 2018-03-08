import React from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'



const Highcharts = require('highcharts');
require('highcharts/modules/map')(Highcharts);

//const Highlight = require('react-highlight');
const ReactDOM = require('react-dom');
const maps = require('../server/world-palestine-highres.geo.json');

Highcharts.mapChart('mapid', {
    chart: {
      spacingBottom: 0
    },
    title: {
      text: 'View Your Times'
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      map: {
        allAreas: true,
        joinBy: ['iso-a2', 'code'],
        dataLabels: {
          enabled: true,
          color: 'white',
          style: {
            fontWeight: 'bold'
          }
        },
        mapData: maps,
        tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}: <b>{series.name}</b>'
        }
      }
    },
    series: [{
      name: 'UTC',
      data: ['IE', 'IS', 'GB', 'PT'].map(function (code) {
        return { code: code };
      })
    }, {
      name: 'UTC + 1',
      data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU', 'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map(function (code) {
        return { code: code };
      })
    },
    {
      name: 'UTC + 2',
      data: ['US', 'AU', 'NZ', 'CA'].map(function (code) {
        return { code: code };
      })
    }]
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

// const config = {
//   chart: {
//     spacingBottom: 20
//   },
//   title: {
//     text: 'Europe time zones'
//   },

//   legend: {
//     enabled: true
//   },

//   plotOptions: {
//     map: {
//       allAreas: false,
//       joinBy: ['iso-a2', 'code'],
//       dataLabels: {
//         enabled: true,
//         color: 'white',
//         style: {
//           fontWeight: 'bold'
//         }
//       },
//       mapData: maps,
//       tooltip: {
//         headerFormat: '',
//         pointFormat: '{point.name}: <b>{series.name}</b>'
//       }

//     }
//   },

//   series: [{
//     name: 'UTC',
//     data: ['IE', 'IS', 'GB', 'PT'].map(function (code) {
//       return { code: code };
//     })
//   }, {
//     name: 'UTC + 1',
//     data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU', 'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map(function (code) {
//       return { code: code };
//     })
//   }]
// };

// ReactDOM.render(React.createElement(ReactHighmaps, { config: config }), document.getElementById('app'));

// ReactDOM.render(React.createElement(
//   Highlight,
//   { className: 'jsx' },
//   require("raw-loader!./highmaps.jsx")
// ), document.getElementById('code-js'));

// ReactDOM.render(React.createElement(
//   Highlight,
//   { className: 'html' },
//   require("raw-loader!./highmaps.html")
// ), document.getElementById('code-html'));

// require("file?name=[name].[ext]!./highmaps.html");
