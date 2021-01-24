import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, AppBar, Toolbar, Typography, Slide} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleDialogHorarioProfesor, } from '../../redux/actions';

import HorarioProfesor from '../vistaVerHorarios/HorarioProfesor/HorarioProfesor';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#EA7600'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const DialogHorarioProfesorSelector = createSelector(
  state => state.dialogHorarioProfesor,
  dialogHorarioProfesor => dialogHorarioProfesor
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VerHorarioProfesor = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const dialogHorarioProfesor = useSelector(DialogHorarioProfesorSelector);
  const {open, selectedUser} = dialogHorarioProfesor;

  return (
    <div>
      <Dialog fullScreen open={open} onClose={() => dispatch(handleDialogHorarioProfesor())}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {`Horario ${selectedUser.name} ${selectedUser.lastName}`}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => dispatch(handleDialogHorarioProfesor())}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <HorarioProfesor selectedUser={selectedUser.id}/>
      </Dialog>
    </div>
  );
}

export default VerHorarioProfesor;
