import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

interface SpecificationInterface {
    km: number;
    minutes: number;
}

export const TimeSpecification = ({km, minutes}: SpecificationInterface) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const typographyStyle = { 
    fontSize: 18, 
    display: 'flex', 
    alignItems: 'center',
    marginTop: '0px',
    marginBottom: '0px',
   }

   const h5Style = {
    marginLeft: '5px',
    marginTop: '0px',
    marginBottom: '0px',
    fontSize: isMobile?'0.9rem':'1rem',
    fontFamily: 'Arial',
    color: '#212121'
  }

  return (
    <Card sx={{ 
        bottom: '15px',
        right: '10px',
        position: 'fixed'
         }}>
      <CardContent>
        <Typography variant="h5" component="div"
        sx={{
          fontSize: isMobile?'1rem':'1.4rem',
        }} >
          Descripcion viaje
        </Typography>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: isMobile?'column':'row',
        }}>
          <Typography sx={typographyStyle} color="text.secondary" gutterBottom>
              <AccessTimeOutlinedIcon sx={{
                mr: '5px',
              }} fontSize = {isMobile?'small':'medium'} />
              <span style = {{
                fontSize: isMobile?'1rem':'1.2rem',
              }} >Tiempo:</span>
          </Typography>
          <h5 style ={h5Style} > {minutes} minutos</h5>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: isMobile?'column':'row',
        }}>
          <Typography sx={typographyStyle} color="text.primary" gutterBottom>
              <RouteOutlinedIcon sx={{
                mr: '5px',
              }} fontSize = {isMobile?'small':'medium'} />
              <span style = {{
                fontSize: isMobile?'1rem':'1.2rem',
              }} >Distancia:</span>
          </Typography>
          <h5 style ={h5Style} > {km} km</h5>
        </div>

      </CardContent>
    </Card>
  )
}
