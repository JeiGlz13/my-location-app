import { TextField } from "@mui/material"
import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';
import { SearchResult } from "./SearchResult";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const SearchBar = () => {
    const {searchPlacesByTerm} = useContext(PlacesContext);
    const debounceRef = useRef<NodeJS.Timeout>();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const onQueryChanged = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void =>{
        if(debounceRef.current)
            clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(()=>{
            searchPlacesByTerm(event.target.value)
        }, 700)
    }
  return (
    <>
    <TextField
        id="outlined-name"
        label="Buscar Lugar"
        variant="filled"
        sx={{
            backgroundColor: 'white',
            marginRight: isMobile?'5px':'15px',
            borderRadius: '10px',
            overflow: 'hidden',
            fontSize: isMobile?'0.7rem':'0.9rem',
            width: isMobile?'12rem':'15rem',
        }}
        onChange = {onQueryChanged}
        size={isMobile ? 'small' : 'medium'}
        />

        <SearchResult/>
    </>
  )
}
