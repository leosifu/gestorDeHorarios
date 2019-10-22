import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import MallaForm from './mallaForm'

import axios from 'axios';

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
}));



function ActualizarMalla({malla, open, setOpen, estado, setEstado}) {
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = event => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = event => {
    setFullWidth(event.target.checked);
  };

  function onSubmitForm(state) {
    const num_niveles = parseInt(state.n_niveles.value)
    const data = {
      nombre_malla: state.nombre_malla.value,
      cod_malla: state.cod_malla.value,
      n_niveles: state.n_niveles.value
    }
    let link = 'http://localhost:8000/api/malla/' + malla.id
    axios.put(link, data)
    .then(res => {
      console.log(res.data);
      setOpen(false)
      setEstado(!estado)
    })
    .catch((error)=>{
      console.log(error);
    })
    console.log(data);
  }

  return (
    <React.Fragment>
      <Fab color="secondary" size="small" aria-label="add" className={classes.margin} onClick={handleClickOpen}>
        <EditIcon />
      </Fab>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Crear Malla</DialogTitle>
        <DialogContent>
          <MallaForm nombre_malla={malla.nombre_malla} cod_malla={malla.cod_malla} n_niveles={malla.n_niveles} estado={estado} setEstado={setEstado} onSubmitForm={onSubmitForm}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ActualizarMalla
