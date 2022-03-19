/*eslint import/no-webpack-loader-syntax: off */

import { useContext, useLayoutEffect, useRef } from "react"

//@ts-ignore
import {Map} from '!mapbox-gl';
import { MapContext, PlacesContext } from "../context";
import { LoadingComponent } from "./LoadingComponent";

export const MapView = () => {
    const {isLoading, userLocation} = useContext(PlacesContext);
    const {setMap} = useContext(MapContext);

    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if(!isLoading){
        const map = new Map({
            container: mapDiv.current!, // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: userLocation, // starting position [lng, lat]
            zoom: 14 // starting zoom
            });

          setMap(map);
      }
    }, [isLoading])

    if(isLoading){
        return(<LoadingComponent/>)
    }

  return (
    <div ref={mapDiv}
    style = {{
        height: '100vh',
        position: 'fixed',
        left: 0, 
        top: 0,
        width: '100vw',
    }} >
        {userLocation?.join(',')}
    </div>
  )
}
