import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PlacesContext, MapContext } from '../context';
import { useContext, useState } from 'react';
import { Feature } from '../interfaces/places';

import './active.css'
import { Navigation } from '@mui/icons-material';
import { Button } from '@mui/material';

export const SearchResult = () => {
    const {places, isLoadingPlaces, userLocation} = useContext(PlacesContext);
    const {map, getRouteBeetweenPoints} = useContext(MapContext);

    const [activeId, setActiveId] = useState('');

    const onPlaceClick = (place: Feature) =>{
        const [lng, lat] = place.center;
        setActiveId(place.id)
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    const getRoute = (place: Feature) =>{
        if(!userLocation) return;
        onPlaceClick(place);

        const [lng, lat] = place.center;
        getRouteBeetweenPoints(userLocation, [lng, lat]);
    }

    if(isLoadingPlaces){
        return<></>
    }
  return (
        <List sx = {{
            width: '25%',
            backgroundColor: places.length > 0?'white':'transparent',
            borderRadius: '15px',
            marginRight: '4px',
        }} >
            {
                places.map((place)=>(
                    <div key = {place.id} className = {(activeId === place.id)?'active':''}>
                    <ListItem  disablePadding 
                    onClick ={() => onPlaceClick(place)}
                     >
                        <ListItemButton>
                            <ListItemText primary={place.text} secondary = {place.place_name} />
                        </ListItemButton>
                    </ListItem>

                    <Button
                    onClick = {()=>getRoute(place)} sx = {{
                        marginLeft: '15px'
                    }} variant="contained" endIcon={<Navigation />}>
                        Direcciones
                    </Button>

                    <hr/>
                    </div>
                ))
            }
        </List>
  )
}
