import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';

const useStyles = makeStyles({
  contenido:{
    height: '100%',
    padding: '3px 3px 3px 3px',
    "&:last-child": {
      paddingBottom: 3
    }
  },
  nombreCoord:{
    fontSize: 11.5,
  },
  icono:{
    fontSize: 12,
    margin: 'auto',
    textAlign: 'center'
  }
});

function BloqueTablaHorario({coord, nombre_coord, cod_coord, color}){

  const classes = useStyles();

  console.log(coord);

  return(
    <CardContent className={classes.contenido} style={{background: color}}>
      <Grid container>
        <Grid item xs={10}>
          <Typography className={classes.nombreCoord}>
            {nombre_coord}
            {cod_coord}
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.nombreCoord} >
          <IconButton >
            <InfoTwoToneIcon fontSize="small" className={classes.icono}/>
          </IconButton>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default BloqueTablaHorario
