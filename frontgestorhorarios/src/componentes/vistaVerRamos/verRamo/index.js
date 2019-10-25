import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListadoSecciones from '../listadoSecciones'
import ListaCoord from '../listaCoord'
import TabsRamo from './tabs'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  sector:{
    margin: 20,
  },
  campoDes:{
    marginBottom: 10,
    padding: 10,
  },
  descripcion:{
    margin: 10,
    padding: 10,
    height: '4rem',
  },
  titulo:{
    margin: 10,
    padding: 10,
  }
}));

const VerRamo = ({estado, setEstado, asignatura}) =>{

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(asignatura);

  return(
    <>
      <IconButton aria-label="settings" size='small' style={{padding:0}} onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        style={{height:630}}
      >
       <TabsRamo asignatura={asignatura}/>
      </Dialog>
    </>
  )
}
export default VerRamo
