import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import TabsAsignatura from './tabs'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 12,
  },
}));

const VerAsignatura = ({cod_asignatura, asignaturaId, edit, setEdit, activo, setActivo}) =>{

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);

  const [estado, setEstado] = useState(false)

  console.log(cod_asignatura);

  const [asignatura, setAsignatura] = useState([])

  useEffect(()=>{
    var link = 'http://localhost:8000/api/asignatura/' + asignaturaId
    axios.get(link)
    .then(res => {
      console.log(res.data[0]);
      setAsignatura(res.data[0])
    })
    .catch((error)=>{
      console.log(error);
    })
  },[asignaturaId, estado])

  const handleClickMenu = event => {
    setActivo(asignatura.id)
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickEdit = (event) => {
    event.preventDefault()
    setEdit(1)
    setAnchorEl(null);
  }

  return(
    <>
      <IconButton aria-label="settings" size='small' style={{padding:0}} onClick={handleClickMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open2}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 200,
          },
        }}
      >
        <MenuItem onClick={handleClickOpen} style={{fontSize:'15'}}>
          <Typography className={classes.title} align="center">
            Información de la Asignatura
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClickEdit}>
          <Typography className={classes.title} align="center">
            Definir Prerrequisitos
          </Typography>
        </MenuItem>
      </Menu>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        style={{height:630}}
      >
       <TabsAsignatura cod_asignatura={cod_asignatura} asignatura={asignatura} estado={estado} setEstado={setEstado}/>
      </Dialog>
    </>
  )
}
export default VerAsignatura
