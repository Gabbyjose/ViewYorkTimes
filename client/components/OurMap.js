import React, {Component} from 'react';
// Load Highcharts
const Highcharts = require('highcharts');

// Load a module
require('highcharts/modules/map')(Highcharts);

export class OurMap extends Component {
  constructor() {
    super();
    this.state = {
      map: true,
    }
  }

  render() {
    return (
      <h1>Hello World</h1>
    )
  }

}




//lololol react
// import React, { Component } from 'react'
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

// export default class OurMap extends Component {
//   state = {
//     lng: -74.0060,
//     lat: 40.7128,
//     zoom: 5,
//   }

//   render() {
//     const position = [this.state.lat, this.state.lng]
//     return (
//       <Map center={position} zoom={this.state.zoom} id="mapid">
//         <TileLayer
//           attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             <span>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </span>
//           </Popup>
//         </Marker>
//       </Map>
//     )
//   }
// }

module.exports = OurMap;
