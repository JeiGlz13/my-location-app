import { createContext } from "react";
import { Feature } from '../../interfaces/places';

export interface PlacesContextInterface {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];

    searchPlacesByTerm: (query: string) => Promise<Feature[]>
}




export const PlacesContext = createContext<PlacesContextInterface>({} as PlacesContextInterface );