import React, {useState} from 'react';
import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'

import {Card, CardContent, CardActions, ButtonGroup, Grid} from '@material-ui/core';

import PrimaryButton from '../../utils/PrimaryButton';

import ActualizarMalla from '../formularios/formMalla/actualizarMalla';

function Malla({ malla, estado, setEstado, user, userRedux, }){

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const Link1 = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  const redirectMalla = () => {
    dispatch(push(`/malla/${malla.id}`))
  }

  const redirectHorario = () => {
    dispatch(push(`/horario/${malla.id}`))
  }

  return(
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            {malla.cod_malla}
          </Grid>
          {
            userRedux.status === 'login' &&
            (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
            <Grid item xs={2}>
              <ActualizarMalla malla={malla} open={open} setOpen={setOpen} estado={estado}
                setEstado={setEstado} user={user}/>
            </Grid>
          }
        </Grid>
      </CardContent>
      <CardActions>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="full-width contained primary button group"
        >
          <PrimaryButton className='primaryButton' onClick={redirectMalla} title='Ver Malla'/>
          {
            userRedux.status === 'login' &&
            <PrimaryButton onClick={redirectHorario} title={'Horarios'} />
          }
        </ButtonGroup>
      </CardActions>
    </Card>
  )
}

export default Malla
