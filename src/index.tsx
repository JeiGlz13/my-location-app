/*eslint import/no-webpack-loader-syntax: off */

import React from 'react';
import ReactDOM from 'react-dom';
import {MapsApp} from './MapsApp';

import './index.css';

//@ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiamVpZzEzIiwiYSI6ImNsMHY4ODd3azExenczaXJwNTNndjR6Y20ifQ.vOi67-BkhUSrixhESSZHew';

if(!navigator.geolocation){
  alert('Tu navegador no tiene opcion de geolocalizacion');
  throw new Error('Tu navegador no tiene opcion de geolocalizacion')
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

