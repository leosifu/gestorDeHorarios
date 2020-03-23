import React, {useState, useEffect, useRef} from 'react';
import { Link, useParams } from "react-router-dom";
import clientAxios from '../../../config/axios'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import {setMallaRedux, setLoading} from '../../../redux/actions'

import Asignatura from './asignatura'
import NotificacionForm from '../notificacionForm'

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

    overflowY: 'scroll',


  },
  button: {
    position: 'absolute',
    top: '90%',
    left: '90%'
  },
  button2: {
    position: 'absolute',
    top: '90%',
    left: '75%'
  },
});


function VerMalla(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {mallaId} = useParams();
  console.log(mallaId);

  const [estado, setEstado] = useState(false);

  const [niveles, setNiveles] = useState([])

  const [activo, setActivo] = useState(-1)

  const [requisitos, setRequisitos] = useState([])

  const [edit, setEdit] = useState(0)

  const firstUpdate = useRef(true);

  useEffect(()=>{
    clientAxios().get(`/api/malla/${mallaId}`)
    .then(res => {
      console.log(res.data[0]);
      dispatch(setMallaRedux(res.data[0]));
      setNiveles(res.data[0].niveles);
      dispatch(setLoading(false))
    })
    .catch((error)=>{
      console.log(error);
    })
  },[estado, mallaId])

  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    clientAxios().get(`/api/asignaturaReq/${activo}`)
    .then(res => {
      console.log(res);
      console.log(res.data[0]);
      setActivo(res.data[0].id)
      var req = res.data[0].requisitos.map(requisito => requisito.id)
      setRequisitos(req)
    })
    .catch((error)=>{

      console.log(error);
    })
  },[activo])

  function handleClick1(event, algo){
    event.preventDefault()
    setActivo(algo)
  }

  function handleClick2(event, algo){
    event.preventDefault()
    var copiaRequisitos = requisitos.slice()
    if(algo === activo){
      return
    }
    if (copiaRequisitos.indexOf(algo)===-1) {
      copiaRequisitos.push(algo)
      const data = {
        asignaturaId: activo,
        requisitoId: algo
      }
      clientAxios().post('/api/dependencia', data)
      .then(res => {
        console.log(res.data);
      })
    }
    else {
      console.log("asd");
      const data = {
        asignaturaId: activo,
        requisitoId: algo
      }
      console.log(data);
      clientAxios().delete('/api/dependencia', {data: data})
      .then(res => {
        console.log(res.data);
      })
      copiaRequisitos.splice(copiaRequisitos.indexOf(algo), 1)

    }
    setRequisitos(copiaRequisitos)
  }

  function guardarRequisitos(event){
    console.log(requisitos);
    setEdit(0)
  }

  return (
    <Paper className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        {niveles ? niveles.map(nivel => {
          return(
            <div style={{height:590}} key={nivel.nivel}>
              <GridListTile style={{ height: 'auto', overflow:'auto', padding:0 }}>
                <Asignatura activo={activo} setActivo={setActivo} requisitos={requisitos}
                  handleClick={edit===1?handleClick2:handleClick1} nivel={nivel.nivel}
                  asignaturas={nivel.asignaturas} edit={edit} setEdit={setEdit}
                  estado={estado} setEstado={setEstado} mallaId={mallaId}/>
              </GridListTile>
            </div>
        )}) : < div/>}
      </GridList>
      {edit===0?
        (
          <>
            <Link style={{ textDecoration: 'none', color:'white' }} to={`/horario/${mallaId}`}>
              <Button variant="contained" color="primary" className={classes.button}>
                  Horarios
              </Button>
            </Link>
            <Link style={{ textDecoration: 'none', color:'white' }} to={`/horario/${mallaId}`}>
              <Button variant="contained" color="primary" className={classes.button2}>
                  Profesores
              </Button>
            </Link>
          </>
        ):
        <Button variant="contained" color="primary" className={classes.button} onClick={guardarRequisitos}>
          Guardar Requisitos
        </Button>
      }

      <NotificacionForm />
    </Paper>
  );
}

export default VerMalla
