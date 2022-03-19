import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

export const LoadingComponent = () => {
  return (
    <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          > <div style = {{
              display:'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
          }} >
                <Typography variant = "h4" mb={4} >
                    Espere...
                </Typography>
                <CircularProgress color="inherit" />
            </div>
          </Backdrop>
  )
}
