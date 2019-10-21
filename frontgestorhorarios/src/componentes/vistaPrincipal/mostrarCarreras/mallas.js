import React from 'react';
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


export default function Mallas(mallas){
  console.log(mallas);
  if(typeof mallas !== 'undefined'){
    var mallasR = mallas.mallas;
    console.log(mallasR);
    const ListaMallas = mallasR.map((malla, i)=>(
      <Card key={i}>
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              {malla.nombre_malla}
            </Grid>
            <Grid item xs={2}>
              <Fab color="secondary" size="small" aria-label="edit">
                <EditIcon />
              </Fab>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="full-width contained primary button group"
          >
            <Button><Link style={{ textDecoration: 'none', color:'white' }} to="/ramos">Ver Ramos</Link></Button>
            <Button><Link style={{ textDecoration: 'none', color:'white' }} to="/horario">Horarios</Link></Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    ))
    return(
      <CardContent>
        {ListaMallas}
      </CardContent>
    )
  }
}
