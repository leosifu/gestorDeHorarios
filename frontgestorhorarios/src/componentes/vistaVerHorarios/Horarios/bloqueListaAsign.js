import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    width: '100%',
    height: '100%',
  },
  contenido:{
    padding: '3px 3px 3px 3px',
  }
});

function BloqueListaAsign({nombre_coord, cod_coord, num, color}){

  const classes = useStyles();

  return(
    <Card className={classes.card} padding="none" style={{background: color}}>
      <CardContent className={classes.contenido}>
        <Grid container>
          <Grid item xs={11}>
            <Typography >
              {nombre_coord}
              {cod_coord}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {num}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BloqueListaAsign
