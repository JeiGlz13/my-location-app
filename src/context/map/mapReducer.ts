/*eslint import/no-webpack-loader-syntax: off */

import { MapStateInterface } from "./MapProvider";

//@ts-ignore
import { Map, Marker } from '!mapbox-gl';

type MapAction =
| {type: 'setMap', payload: Map}
| {type: 'setMarkers', payload: Marker[]}
| {type: 'setSpecification', payload: {minutes: number, km: number}}

export const mapReducer = (state: MapStateInterface, action: MapAction): MapStateInterface =>{
    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            };
            
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }

        case 'setSpecification':
            return {
                ...state,
                minutes: action.payload.minutes,
                km: action.payload.km
            }

        default:
            return state;
    }
}