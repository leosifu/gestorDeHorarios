import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {handleDialogTopes, } from '../../../redux/actions'

import VistaTopes from './VistaTopes';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const DialogTopesSelector = createSelector(
  state => state.dialogTopes,
  dialogTopes => dialogTopes
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TopesDialog = ({userRedux, numNiveles, currentProceso}) => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const dialogTopes = useSelector(DialogTopesSelector);
  const {open, data} = dialogTopes;

  console.log(userRedux);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={() => dispatch(handleDialogTopes())}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={() => dispatch(handleDialogTopes())}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <VistaTopes numNiveles={numNiveles} userRedux={userRedux} nivel={data.nivel}
          currentProceso={currentProceso}/>
      </Dialog>
    </div>
  );
}

export default TopesDialog;
