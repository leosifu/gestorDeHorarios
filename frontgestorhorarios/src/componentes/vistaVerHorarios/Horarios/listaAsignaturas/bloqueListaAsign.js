import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography, Grid, FormControlLabel, Checkbox,
  Tooltip, } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
              {nombre_coord}
            </Typography>
            <Typography className={classes.nombreCoord}>
              {cod_coord}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.nombreCoord}>
            {num}
            <Tooltip title="Mostrar">
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ width: 36, height: 36 }}
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" style={{ fontSize: 20 }}/>}
                    checkedIcon={<CheckBoxIcon fontSize="small" style={{ fontSize: 20 }}/>}
                    name="checkedI"
                  />
                }
              />
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BloqueListaAsign
