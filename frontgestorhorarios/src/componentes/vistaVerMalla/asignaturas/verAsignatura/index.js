import React, {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {Dialog, IconButton, Menu, MenuItem, Typography} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import clientAxios from '../../../../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import TabsAsignatura from './tabs'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 12,
  },
}));

const MallaSelector = createSelector(
  state => state.malla,
  malla => malla.malla
)

const VerAsignatura = ({cod_asignatura, asignaturaId, edit, setEdit, activo, setActivo, mallaId}) =>{

  const classes = useStyles();
  const malla = useSelector(MallaSelector)

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);

  const [estado, setEstado] = useState(false)

  const [asignatura, setAsignatura] = useState([])
  const [infoAsignatura, setInfoAsignatura] = useState({})

  useEffect(()=>{
    clientAxios().get(`/api/asignaturaInfo/${malla.id}/${asignaturaId}`)
    .then(res => {
      console.log(res.data);
      setInfoAsignatura(res.data)
      setAsignatura(res.data.Asignatura)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[estado])

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
       <TabsAsignatura infoAsignatura={infoAsignatura} asignatura={asignatura} estado={estado} setEstado={setEstado}/>
      </Dialog>
    </>
  )
}

export default VerAsignatura
