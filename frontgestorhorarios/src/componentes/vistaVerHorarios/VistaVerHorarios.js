import React, {useState, useEffect} from 'react';

import { useParams, } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import clientAxios from '../../config/axios'

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {setLoading, setMallaRedux, handleDialogTopes, } from '../../redux/actions'

import SideBar from './sideBar/sideBar'
import VerHorario from './Horarios/horario/VerHorario'
import TopesDialog from './topes/TopesDialog'

const drawerWidth = 100;

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: -5,
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    margin: '65px 0 0 0',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  horario:{
    margin:10
  },
  button: {
    position: 'sticky',
    top: '90%',
    left: '90%'
  },
  button1: {
    top: '10%',
    left: '90%'
  },
}));

const UserSelector = createSelector(
  state => state.user,
  user => user
);

const ProcesoSelector = createSelector(
  state => state.proceso,
  proceso => proceso.currentProceso
);

const VistaVerHorarios = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const {mallaId} = useParams();
  const userRedux = useSelector(UserSelector);
  const currentProceso = useSelector(ProcesoSelector);
  const user = userRedux.user;

  const [niveles, setNiveles] = useState([]);

  const [nivel, setNivel] = useState(1);

  const [state, setState] = useState([]);

  const [topes, setTopes] = useState(false);

  const [numNiveles, setNumNiveles] = useState(0);

  useEffect(()=>{
    console.log(mallaId);
    if (currentProceso.id !== -1) {
      clientAxios(user.idToken).get(`/api/malla/${mallaId}/${currentProceso.id}`)
      .then(res => {
        console.log(res.data[0]);
        dispatch(setMallaRedux(res.data[0]));
        console.log("asdasd");
        var niveles = res.data[0].niveles
        console.log(niveles);
        setNiveles(niveles)
        console.log(niveles.length);
        setNumNiveles(niveles.length)
        var nivelC = []
        niveles.map(niv=>{nivelC.push(false)})
        console.log(nivelC);
        setState(nivelC)
        dispatch(setLoading(false))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProceso])

  function handleClick1(){
    const data = {
      nivel: nivel,
    }
    dispatch(handleDialogTopes(true, data))
  }

  function handleClick2(){
    setTopes(false)
  }

  const handleChange = name => event => {
    var stateAux = state.slice()
    var isTrue = (event.target.value == 'false')
    stateAux[name] = isTrue
    console.log(stateAux);
    setState(stateAux)
  };

  return (
    <div className={classes.root}>

      <TopesDialog userRedux={userRedux} numNiveles={numNiveles} currentProceso={currentProceso}/>

      <SideBar niveles={niveles} setNivel={setNivel} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Grid container >
            <VerHorario nivel={nivel} user={user} currentProceso={currentProceso} userRedux={userRedux} />
            {/*<DndProvider backend={HTML5Backend}>
              <Grid item xs={12}>
                <div style={{position:'absolute', opacity: 1, width: '82%', zIndex: 0}}>
                  <Horario nivel={nivel} user={user} currentProceso={currentProceso}
                    userRedux={userRedux}/>
                </div>
                {
                  topes && state.map((niv, i)=>(
                      niv && <div style={{position:'absolute', opacity: 0.3, width:'82%', zIndex: 1}}>
                        <Horario nivel={i+1} user={user} currentProceso={currentProceso}
                          userRedux={userRedux} dontDrag={true}/>
                      </div>
                  ))
                }
              </Grid>
              <Grid item xs={topes ? 2 : 0}>
                {
                  topes &&
                  <Topes niveles={state} handleChange={handleChange} />
                }
              </Grid>

            </DndProvider>*/}
            {
              userRedux.status === 'login' &&
              (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
              <Button variant="contained" color="primary" className={classes.button1}
                onClick={handleClick1}>
                Ver Topes
              </Button>
            }
            {/*
              topes ?
              <>
                <Button variant="contained" color="primary" className={classes.button}
                  onClick={handleClick2}>
                  Finalizar
                </Button>
              </>
              :
              <>
                {
                  userRedux.status === 'login' &&
                  (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
                  <Button variant="contained" color="primary" className={classes.button}
                    onClick={handleClick1}>
                    Ver Topes
                  </Button>
                }
              </>
            */}
          </Grid>
      </main>
    </div>
  );
}

export default VistaVerHorarios;
