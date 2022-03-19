import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from '../../helpers/getUserLocation';
import {searchAPI} from '../../apis';
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesStateInterface {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlacesStateInterface = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

interface ProviderPropsInterface {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({children}: ProviderPropsInterface ) => {
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    useEffect(() => {
      getUserLocation()
        .then(longLat => dispatch({type: 'setUserLocation', payload: longLat}))
    }, [])

    const searchPlacesByTerm = async (query: string): Promise<Feature[]> =>{
      if (query.length === 0) {
        dispatch({
          type: 'setPlaces',
          payload: []
        })
        return []
      };
      if (!state.userLocation) throw new Error('No hay ubicacion');

      dispatch({type: 'setLoadingPlaces'});

      const resp = await searchAPI.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: state.userLocation.join(',')
        }
      })

      dispatch({
        type: 'setPlaces',
        payload: resp.data.features
      })

      return resp.data.features;
    }
    
  return (
    <PlacesContext.Provider value = {{
        ...state,
        searchPlacesByTerm
    }}> 
        {children}
    </PlacesContext.Provider>
  )
}
