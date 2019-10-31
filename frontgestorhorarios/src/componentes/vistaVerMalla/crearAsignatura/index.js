import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

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
      lab_independiente: state.lab_independiente.checked,
      mallaId: mallaId.mallaId,
      historial: {
        cupos_pasados: state.cupos_pasados.value,
        tasa_reprobacion: state.tasa_reprobacion.value,
      }
    }
    console.log(data);
    axios.post('http://localhost:8000/api/asignatura', data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
      setEstado(!estado)
    })
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
    lab_independiente: false,
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
