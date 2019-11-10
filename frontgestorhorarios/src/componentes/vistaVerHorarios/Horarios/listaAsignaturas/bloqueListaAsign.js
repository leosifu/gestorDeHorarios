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
    "&:last-child": {
      paddingBottom: 3
    }
  },
  nombreCoord:{
    fontSize: 11.5,
  }
});

function BloqueListaAsign({nombre_coord, cod_coord, num, color}){

  const classes = useStyles();

  return(
    <Card className={classes.card} padding="none" style={{background: color}}>
      <CardContent padding="none" className={classes.contenido}>
        <Grid container>
          <Grid item xs={10}>
            <Typography className={classes.nombreCoord}>
              {nombre_coord + ' - ' + cod_coord}
            </Typography>
            <Typography className={classes.nombreCoord}>

            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.nombreCoord}>
            {num}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BloqueListaAsign
