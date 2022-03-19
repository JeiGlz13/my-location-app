/*eslint import/no-webpack-loader-syntax: off */

import { createContext } from 'react';

//@ts-ignore
import {Map} from '!mapbox-gl';

interface MapContextProps {
    isMapReady: boolean;
    map?: Map;
    minutes: number;
    km: number;
    setMap: (map: Map) => void,
    getRouteBeetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}



export const MapContext = createContext({} as MapContextProps);