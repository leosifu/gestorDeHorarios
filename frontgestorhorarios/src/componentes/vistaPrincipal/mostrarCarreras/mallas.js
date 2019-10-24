import React, {useState} from 'react';
import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import ActualizarMalla from '../formularios/formMalla/actualizarMalla'

export default function Malla({carreraId, malla, estado, setEstado}){
  console.log(malla);
  const [open, setOpen] = useState(false);

  return(
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            {malla.nombre_malla}
          </Grid>
          <Grid item xs={2}>
            <ActualizarMalla malla={malla} open={open} setOpen={setOpen} estado={estado} setEstado={setEstado}/>
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
  )
}