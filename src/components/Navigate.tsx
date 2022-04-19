import Fab from "@mui/material/Fab";
import { Navigation } from '@mui/icons-material'
import { useContext } from 'react';
import { MapContext, PlacesContext } from "../context";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Fab variant="extended"
    sx = {{
      top: '10px',
      right: isMobile?'5px':'15px',
      position: 'fixed',
      fontSize: isMobile?'0.75rem':'0.9rem',
    }} 
    size={isMobile ? 'small' : 'large'}
    onClick = {onClick}
     >
        <Navigation sx={{ mr: 1 }}
        fontSize = {isMobile ? 'small' : 'medium'} />
        Mi posicion
    </Fab>
  )
}
