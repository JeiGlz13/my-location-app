import { MapView, Navigate } from "../components";
import { SearchBar } from "../components/SearchBar";
import { TimeSpecification } from "../components/TimeSpecification";
import { useContext } from 'react';
import { MapContext } from "../context";

export const HomePage = () => {
  const {km, minutes} = useContext(MapContext)
  return (
    <div>
        <MapView/>

        <SearchBar/>

        <Navigate/>

        {
          (km&&minutes)&&(<TimeSpecification km={km} minutes={minutes}/>)
        }
    </div>
  )
}
