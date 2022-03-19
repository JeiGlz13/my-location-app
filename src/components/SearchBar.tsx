import { TextField } from "@mui/material"
import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';
import { SearchResult } from "./SearchResult";

export const SearchBar = () => {
    const {searchPlacesByTerm} = useContext(PlacesContext);
    const debounceRef = useRef<NodeJS.Timeout>();

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
            marginRight: '15px',
            borderRadius: '10px',
            overflow: 'hidden'
        }}
        onChange = {onQueryChanged}
        // value={name}
        // onChange={handleChange}
        />

        <SearchResult/>
    </>
  )
}
