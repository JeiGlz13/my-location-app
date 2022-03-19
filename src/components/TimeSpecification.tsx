import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';

interface SpecificationInterface {
    km: number;
    minutes: number;
}

export const TimeSpecification = ({km, minutes}: SpecificationInterface) => {
  return (
    <Card sx={{ 
        minWidth: 275,
        bottom: '15px',
        right: '10px',
        position: 'fixed'
         }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Descripcion viaje
        </Typography>

        <Typography sx={{ fontSize: 18, 
        display: 'flex', 
        alignItems: 'center',
        marginTop: '0px',
        marginBottom: '0px'
         }} color="text.secondary" gutterBottom>
          <AccessTimeOutlinedIcon/> 
          <h5 style ={{
            marginLeft: '5px',
            marginTop: '0px',
            marginBottom: '0px'
          }} >Tiempo: {minutes} minutos</h5>
        </Typography>

        <Typography sx={{ fontSize: 18, 
          display: 'flex', 
          alignItems: 'center',
          marginTop: '0px',
          marginBottom: '0px'
         }} color="text.secondary" gutterBottom>
          <RouteOutlinedIcon/> 
          <h5 style ={{
            marginLeft: '5px',
            marginTop: '0px',
          marginBottom: '0px',
          }} >Distancia: {km} km</h5>
        </Typography>

      </CardContent>
    </Card>
  )
}
