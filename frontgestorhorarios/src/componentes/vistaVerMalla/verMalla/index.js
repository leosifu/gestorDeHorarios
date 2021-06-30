import React, {useState, useEffect, useRef} from 'react';
import { Link, useParams } from "react-router-dom";
import clientAxios from '../../../config/axios'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {setMallaRedux, setLoading, handleNotifications, } from '../../../redux/actions';

import Asignatura from './asignatura';
import DialogAsignatura from '../dialogs/dialogAsignatura';

const useStyles = makeStyles({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    position:'static',
    // overflowY: 'hidden',
    height: '100%',


  },
  button: {
    position: 'absolute',
    top: '90%',
    left: '90%',
    backgroundColor: '#EA7600',
    color: '#FFF',
    '&:hover':{
      backgroundColor: '#DE7C00',
      boxShadow: 'none',
    }
  },
  button2: {
    position: 'absolute',
    top: '90%',
    left: '80%',
    backgroundColor: '#EA7600',
    color: '#FFF',
    '&:hover':{
      backgroundColor: '#DE7C00',
      boxShadow: 'none',
    }
  },
});

const UserSelector = createSelector(
  state => state.user,
  user => user
);

const ProcesoSelector = createSelector(
  state => state.proceso,
  proceso => proceso.currentProceso
);

function VerMalla(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const {carreraId} = useParams();
  const userRedux = useSelector(UserSelector);
  const currentProceso = useSelector(ProcesoSelector);
  const user = userRedux.user;

  const [estado, setEstado] = useState(false);

  const [niveles, setNiveles] = useState([])

  const [activo, setActivo] = useState(-1)

  const [requisitos, setRequisitos] = useState([])

  const [edit, setEdit] = useState(0)

  const firstUpdate = useRef(true);

  useEffect(()=>{
    dispatch(setLoading(true));
    if (currentProceso.id !== -1) {
      clientAxios(user.idToken).get(`/api/carrera/${carreraId}/${currentProceso.id}`)
      .then(res => {
        console.log(res);
        dispatch(setMallaRedux(res.data[0]));
        setNiveles(res.data.niveles);
        dispatch(setLoading(false))
      })
      .catch((error)=>{
        console.log(error);
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al cargar la malla'}
        ));
      })
    }
  },[estado, carreraId, currentProceso])

  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    clientAxios(user.idToken).get(`/api/asignaturaReq/${activo}/${carreraId}/${currentProceso.id}`)
    .then(res => {
      console.log('qwe');
      setActivo(res.data[0].id)
      var req = res.data[0].requisitos.map(requisito => requisito.id)
      setRequisitos(req)
    })
    .catch((error)=>{
      console.log(error);
      dispatch(setLoading(false))
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al cargar los requisitos'}
      ));
    })
  }, [activo])

  const handleClick1 = (event, algo) => {
    event.preventDefault();
    setActivo(algo);
  }

  function handleClick2(event, algo){
    event.preventDefault()
    var copiaRequisitos = requisitos.slice()
    if(algo === activo){
      return
    }
    if (copiaRequisitos.indexOf(algo) === -1) {
      copiaRequisitos.push(algo)
      const data = {
        asignaturaId: activo,
        requisitoId: algo
      }
      clientAxios(user.idToken).post('/api/dependencia', data)
      .then(res => {

      })
      .catch((error)=>{
        console.log(error);
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al agregar el requisito'}
        ));
      })
    }
    else {
      const data = {
        asignaturaId: activo,
        requisitoId: algo
      }
      clientAxios(user.idToken).delete('/api/dependencia', {data: data})
      .then(res => {

      })
      .catch((error)=>{
        console.log(error);
        dispatch(setLoading(false))
        dispatch(handleNotifications(true, {
          status: 'error',
          message: 'Ocurrió un error al eliminar el requisito'}
        ));
      })
      copiaRequisitos.splice(copiaRequisitos.indexOf(algo), 1)

    }
    setRequisitos(copiaRequisitos)
  }

  function guardarRequisitos(event){
    setEdit(0)
  }

  return (
    <>
      <DialogAsignatura user={user} userRedux={userRedux} currentProceso={currentProceso}
        estadoM={estado} setEstadoM={setEstado} carreraId={carreraId}
      />
      <Paper className={classes.root}>
        <GridList className={classes.gridList} cols={4}>
          {niveles && niveles.map(nivel => (
              <div style={{height: '100%'}} key={nivel.nivel}>
                <GridListTile style={{ height: 'auto', overflow:'auto', padding:0 }}>
                  <Asignatura activo={activo} setActivo={setActivo} requisitos={requisitos}
                    handleClick={edit === 1 ? handleClick2 : handleClick1} nivel={nivel.nivel}
                    asignaturas={nivel.asignaturas} edit={edit} setEdit={setEdit}
                    currentProceso={currentProceso} carreraId={carreraId} user={user}
                    estado={estado} setEstado={setEstado} userRedux={userRedux} carreraId={carreraId}
                  />
                </GridListTile>
              </div>
          ))
        }
        </GridList>
        {
          userRedux.status === 'login' &&
          <>
            {edit === 0 ?
              <>
                {/*
                  user.roles.includes('profe') &&
                  <Link style={{ textDecoration: 'none', color:'white' }} to={`/horarioProfesor`}>
                    <Button variant="contained" color="primary" className={classes.button2}>
                        Mi Horario
                    </Button>
                  </Link>
                */}
                {
                  currentProceso.estado === 'creating' ?
                  (user.roles.includes('admin') || user.roles.includes('coordinador')) &&
                  <Link style={{ textDecoration: 'none', color:'white' }} to={`/horario/${carreraId}`}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Horarios
                    </Button>
                  </Link>
                  :
                  <Link style={{ textDecoration: 'none', color:'white' }} to={`/horario/${carreraId}`}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Horarios
                    </Button>
                  </Link>
                }
              </>
              :
              <Button variant="contained" color="primary" className={classes.button}
                onClick={guardarRequisitos}>
                Guardar Requisitos
              </Button>
            }
          </>
        }
      </Paper>
    </>
  );
}

export default VerMalla
