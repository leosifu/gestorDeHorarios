import React, {useState} from 'react';
import { Link } from "react-router-dom";

import {Card, CardContent, CardActions, Button, ButtonGroup, Grid} from '@material-ui/core';

import ActualizarMalla from '../formularios/formMalla/actualizarMalla'

import { connect } from 'react-redux';
import * as actions from '../../../redux/actions'

function Malla(props){

  console.log(props);

  const { malla, estado, setEstado} = props
  const [open, setOpen] = useState(false);

  const Link1 = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  function onClick(event, mallaId){
    props.setMallaId(mallaId)
  }

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
          <Button component={Link1} to={"/malla/" + malla.id} onClick={event=>onClick(event,malla.id)}>Ver Malla</Button>
          <Button component={Link1} to={"/horario/" + malla.id} onClick={event=>onClick(event,malla.id)}>Horarios</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = state => {
    return {
        mallaId: state.mallaId
    }
}

export default connect(mapStateToProps, actions)(Malla)
