import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';

import AsignaturaForm from './asignaturaForm'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  centrarIcon:{
    marginTop:'30%',
    marginLeft: '20%',
    color:'blue'
  },
}));



function CrearAsignatura({open, setOpen, estado, setEstado, nivel, mallaId}){
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log(mallaId);

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmitForm(state) {
    const data = {
      cod_asignatura: state.cod_asignatura.value,
      nombre_asignatura: state.nombre_asignatura.value,
      tel_T: parseInt(state.tel_T.value),
      tel_E: parseInt(state.tel_E.value),
      tel_L: parseInt(state.tel_L.value),
      nivel: nivel,
      mallaId: mallaId,
      historial: {
        cupos_pasados: state.cupos_pasados,
        tasa_reprobacion: state.tasa_reprobacion,
      }
    }
    console.log(data);
    /*axios.post('http://localhost:8000/api/asignatura', data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
      setEstado(!estado)
    })*/
  }

  var camposAsignatura = {
    cod_asignatura: '',
    nombre_asignatura: '',
    descripcion: '',
    tel_T: 0,
    tel_E: 0,
    tel_L: 0,
    cupos_pasados: 0,
    tasa_reprobacion: 0,
  }

  return (
    <React.Fragment>
      <IconButton className={classes.centrarIcon} onClick={handleClickOpen}>
        <AddCircleOutlineOutlinedIcon fontSize='large' style={{color:"blue"}}/>
      </IconButton>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Crear Asignatura
        </DialogTitle>

          {/*<CarreraForm cod_carrera={''} nombre_carrera={''} jornada={"Vespertino"} open={open} setOpen={setOpen} onSubmitForm={onSubmitForm}/>*/}
          <AsignaturaForm camposAsignatura={camposAsignatura} onSubmitForm={onSubmitForm}/>

      </Dialog>
    </React.Fragment>
  );
}

export default CrearAsignatura
