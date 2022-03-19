import Fab from "@mui/material/Fab";
import { Navigation } from '@mui/icons-material'
import { useContext } from 'react';
import { MapContext, PlacesContext } from "../context";

export const Navigate = () => {
    const {map, isMapReady} = useContext(MapContext);
    const {userLocation} = useContext(PlacesContext);

    const onClick = () =>{
        if(!isMapReady) throw new Error('No hay mapa');
        if(!userLocation) throw new Error('No hay ubicacion');

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }
  return (
    <Fab variant="extended"
    sx = {{
      top: '5px',
      right: '10px',
      position: 'fixed'
    }} 
    onClick = {onClick}
     >
        <Navigation sx={{ mr: 1 }} />
        Mi posicion
    </Fab>
  )
}
