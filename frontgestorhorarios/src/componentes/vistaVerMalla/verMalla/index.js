import React, {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

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
});


function VerMalla(props) {

  console.log(props);

  const classes = useStyles();

  const [estado, setEstado] = useState(false);

  const [niveles, setNiveles] = useState([])

  const [activo, setActivo] = useState(-1)

  const [requisitos, setRequisitos] = useState([])

  const [edit, setEdit] = useState(0)

  useEffect(()=>{
    var link = 'http://localhost:8000/api/malla/' + props.match.params.id
    axios.get(link)
    .then(res => {
      console.log(res.data[0]);
      setNiveles(res.data[0].niveles)
    })
  },[estado, props.match.params.id])

  function handleClick1(event, algo){
    event.preventDefault()
    //event.target.style.border = '1px solid green'
    console.log(algo);
    var link = 'http://localhost:8000/api/asignatura/' + algo
    axios.get(link)
    .then(res => {
      console.log(res.data[0]);
      setActivo(res.data[0].id)
      var req = res.data[0].requisitos.map(requisito => requisito.id)
      setRequisitos(req)
    })
  }

  function handleClick2(event, algo){
    event.preventDefault()
    console.log("hola");
    var copiaRequisitos = requisitos.slice()
    if(algo == activo){
      return
    }
    if (copiaRequisitos.indexOf(algo)==-1) {
      copiaRequisitos.push(algo)
      const data = {
        asignaturaId: activo,
        requisitoId: algo
      }
      console.log(data);
      axios.post('http://localhost:8000/api/dependencia', data)
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

      axios.delete('http://localhost:8000/api/dependencia', {params: data})
      .then(res => {
        console.log(res.data);
      })
      copiaRequisitos.splice(copiaRequisitos.indexOf(algo), 1)

    }
    console.log(copiaRequisitos);
    setRequisitos(copiaRequisitos)
  }

  function guardarRequisitos(event){
    console.log(requisitos);
    setEdit(0)
  }

  return (
    <Paper className={classes.root}>
      <GridList className={classes.gridList} cols={8}>
        {niveles ? niveles.map(nivel => {
          return(
            <div style={{height:590}} key={nivel.nivel}>
              <GridListTile style={{ height: 'auto', overflow:'auto' }}>
                <Asignatura activo={activo} setActivo={setActivo} requisitos={requisitos}
                  handleClick={edit==1?handleClick2:handleClick1} nivel={nivel.nivel}
                  asignaturas={nivel.asignaturas} edit={edit} setEdit={setEdit}
                  estado={estado} setEstado={setEstado}/>
              </GridListTile>
            </div>
        )}) : < div/>}
      </GridList>
      {edit==0?
        <Link style={{ textDecoration: 'none', color:'white' }} to={"/horario/" + props.match.params.id}>
          <Button variant="contained" color="primary" className={classes.button}>
              Horarios
          </Button>
        </Link>:
        <Button variant="contained" color="primary" className={classes.button} onClick={guardarRequisitos}>
          Guardar Requisitos
        </Button>
      }

      <NotificacionForm />
    </Paper>
  );
}

const mapStateToProps = state => {
    return {
        mallaId: state.mallaId
    }
}

export default connect(mapStateToProps)(VerMalla)
