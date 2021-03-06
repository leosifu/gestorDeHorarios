import React, {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {Dialog, IconButton, Menu, MenuItem, Typography} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import clientAxios from '../../../../config/axios'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, handleNotifications, handleDialogAsignatura, } from '../../../../redux/actions'

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

const VerAsignatura = ({cod_asignatura, asignaturaId, edit, setEdit, activo, setActivo,
  mallaId, user, currentProceso, userRedux, estadoM, setEstadoM, carreraId, }) =>{

  const classes = useStyles();
  const dispatch = useDispatch();
  const malla = useSelector(MallaSelector);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);

  const handleClickMenu = event => {
    setActivo(asignaturaId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    const data = {
      asignaturaId: asignaturaId
    }
    dispatch(handleDialogAsignatura(true, data));
    // setOpen(true);
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
      <IconButton aria-label="settings" size='small' style={{padding:0}}
        onClick={handleClickMenu}>
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
        {
          userRedux.status === 'login' &&
          (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
          <MenuItem onClick={handleClickEdit}>
            <Typography className={classes.title} align="center">
              Definir Prerrequisitos
            </Typography>
          </MenuItem>
        }
      </Menu>
      {/*<Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        style={{height:630}}
      >
       <TabsAsignatura infoAsignatura={infoAsignatura} asignatura={asignatura} estado={estado}
        setEstado={setEstado} user={user} userRedux={userRedux} currentProceso={currentProceso}
        estadoM={estadoM} setEstadoM={setEstadoM}/>
      </Dialog>*/}
    </>
  )
}

export default VerAsignatura
