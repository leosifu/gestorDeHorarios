import React, { useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  contenido:{
    padding: '3px 3px 3px 3px',
  }
});

function BloqueListaAsign({nombre_coord, cod_coord}){

  const classes = useStyles();

  return(
    <CardContent className={classes.contenido}>
      <Grid container>
        <Grid item xs={11}>
          <Typography >
            {nombre_coord}
            {cod_coord}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default BloqueListaAsign
