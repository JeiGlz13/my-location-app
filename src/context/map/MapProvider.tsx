/*eslint import/no-webpack-loader-syntax: off */


//@ts-ignore
import {AnySourceData, LngLatBounds, Map, Marker, Popup} from '!mapbox-gl';
import { MapContext } from './MapContext';
import { useReducer, useContext, useEffect } from 'react';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';
import { directionsAPI } from '../../apis';

export interface MapStateInterface {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
    km: number,
    minutes: number
}

const INITIAL_STATE: MapStateInterface = {
    isMapReady: false,
    map: undefined,
    markers: [],
    km: 0,
    minutes: 0
}

interface MapPropsInterface {
    children: JSX.Element | JSX.Element[] ;
}

export const MapProvider = ({children}: MapPropsInterface ) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const {places} = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach(marker=> marker.remove());

        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                    .setHTML(`
                        <h4>${place.text}</h4>
                        <p>${place.place_name}</p>
                    `);

            const newMarker = new Marker()
                            .setPopup(popup)
                            .setLngLat([lng, lat])
                            .addTo(state.map!)

                newMarkers.push(newMarker);
        }

        dispatch({
            type: 'setMarkers',
            payload: newMarkers
        })
    }, [places]);

    const setMap = (map: Map) =>{
        const myLocationPopUp = new Popup()
            .setHTML(`
                <h4>AMi posicion</h4>
            `)

        new Marker({
            color: 'rgb(239 68 68)'
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopUp)
            .addTo(map)

        dispatch({type: 'setMap', payload: map});
    }

    const getRouteBeetweenPoints = async (start: [number, number], end: [number, number]) =>{
        const resp = await directionsAPI.get(`/${start.join(',')};${end.join(',')}`);
        
        const {distance, duration, geometry} = resp.data.routes[0];
        const {coordinates: coords} = geometry;

        let km = distance/1000;
        km = Math.round(km*100);
        km /= 100; 

        const minutes = Math.floor(duration/60);

        dispatch({type: 'setSpecification', payload: {km, minutes}})
        

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]]
            bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, {
            padding: 200
        });

        //Polyline


        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if(state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString')
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })
    }

  return (
    <MapContext.Provider value = {{
        ...state,
        setMap,
        getRouteBeetweenPoints
    }} >
        {children}
    </MapContext.Provider>
  )
}
