import React, {useState, useEffect, } from 'react';

import clientAxios from '../../config/axios';

import {Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, Grid, FormControlLabel, Checkbox, FormGroup} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleDialogCreate, handleDialogHorarioProfesor, } from '../../redux/actions'

const DialosUsuarioSelector = createSelector(
  state => state.dialogUsuario,
  dialogUsuario => dialogUsuario
);

const AdministrarUsuario = ({changed, setChanged, currentProceso, }) => {

  const dispatch = useDispatch();
  const dialogUsuario = useSelector(DialosUsuarioSelector);

  const [userState, setUserState] = useState({
    id: 0,
    name: '',
    lastName: '',
    email: '',
    rut: ''
  });
  const [userRoles, setUserRoles] = useState({
    coordinador: false,
    profe: false
  })

  useEffect(() => {
    setUserState({
      id: dialogUsuario.usuario.id,
      name: dialogUsuario.usuario.name,
      lastName: dialogUsuario.usuario.lastName,
      email: dialogUsuario.usuario.email,
      rut: dialogUsuario.usuario.rut,
    });
    setUserRoles({
      coordinador: dialogUsuario.usuario.roles.includes('coordinador'),
      profe: dialogUsuario.usuario.roles.includes('profe')
    });
  }, [dialogUsuario.usuario]);

  const handleOnChange = (event) => {
    setUserState({...userState, [event.target.id]: event.target.value})
  }

  const handleChange = (event) => {
    setUserRoles({...userRoles, [event.target.name]: event.target.checked})
  }

  const handleCLick = () => {
    const data = {
      usuarioData: userState,
      rolesData: Object.keys(userRoles).filter(rol => userRoles[rol]),
      procesoId: currentProceso.id
    }
    if (dialogUsuario.type === 'edit') {
      clientAxios().put(`/api/editUsuario/${userState.id}`, data)
      .then(res => {
        console.log(res.data);
        dispatch(handleDialogCreate(false));
        setChanged(!changed);
      })
      .catch(error => {
        console.log(error);
      })
    }
    else {
      clientAxios().post(`/api/createUsuario`, data)
      .then(res => {
        console.log(res.data);
        dispatch(handleDialogCreate(false))
        setChanged(!changed);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  return (
    <div>
      <Dialog open={dialogUsuario.open} onClose={() => dispatch(handleDialogCreate(false))} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {
            `${dialogUsuario.type === 'edit' ? 'Editando': 'Creando'} Usuario`
          }
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                variant="outlined"
                id="name"
                label="Nombres del Usuario"
                value={userState.name}
                onChange={handleOnChange}
              />
              <TextField
                margin="dense"
                variant="outlined"
                id="lastName"
                label="Apellidos del Usuario"
                value={userState.lastName}
                onChange={handleOnChange}
              />
              <TextField
                margin="dense"
                variant="outlined"
                id="email"
                label="Correo del Usuario"
                type="email"
                value={userState.email}
                onChange={handleOnChange}
              />
              <TextField
                margin="dense"
                variant="outlined"
                id="rut"
                label="Rut del Usuario"
                value={userState.rut}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userRoles.coordinador}
                      onChange={handleChange}
                      name="coordinador"
                    />
                  }
                  label="Coordinador"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userRoles.profe}
                      onChange={handleChange}
                      name="profe"
                    />
                  }
                  label="Profesor"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(handleDialogCreate(false))} color="primary">
            Cerrar
          </Button>
          <Button onClick={() => dispatch(handleDialogHorarioProfesor(true, userState.id))}
            color="primary">
            Ver Horario
          </Button>
          <Button onClick={() => handleCLick()} color="primary">
            {dialogUsuario.type === 'edit' ? 'Actualizar Usuario' : 'Crear Usuario'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdministrarUsuario;
