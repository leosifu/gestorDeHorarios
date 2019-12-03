import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Horario from '../Horarios/horario'
import Topes from '../topes'

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
  spacing:8,
}));

export default function SideBar(props) {
  const classes = useStyles();

  const [niveles, setNiveles] = useState([])

  const [nivel, setNivel] = useState(1)

  const [state, setState] = useState([])

  const [topes, setTopes] = useState(false)

  useEffect(()=>{
    var link = 'http://localhost:8000/api/malla/' + props.match.params.id
    axios.get(link)
    .then(res => {
      console.log(res.data[0]);
      console.log("asdasd");
      var niveles = res.data[0].niveles
      setNiveles(niveles)
      var nivelC = []
      niveles.map(niv=>{nivelC.push(false)})
      console.log(nivelC);
      setState(nivelC)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleClick1(){
    setTopes(true)
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
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        open={false}
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {niveles.map((nivel, index) => (
            <ListItem button key={"Nivel" + nivel.nivel} onClick={event=>setNivel(nivel.nivel)}>
              {index % 2 === 0 && <Divider />}
              <ListItemText primary={"Nivel " + nivel.nivel} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Grid container >
            <DndProvider backend={HTML5Backend}>
              <Grid item xs={10}>
                {
                  topes && state.map((niv, i)=>(
                      niv && <div style={{position:'absolute', opacity: 0.3, width:'70%', zIndex: 1}}>
                        <Horario nivel={i+1}/>
                      </div>
                  ))
                }

                <div style={{position:'absolute', opacity: 1, width:'70%', zIndex: 0}}>
                  <Horario nivel={nivel}/>
                </div>
              </Grid>
              <Grid item xs={2} style={{zIndex: 100}}>
                {
                  topes ?
                  <>
                  <Button variant="contained" color="primary" className={classes.button} onClick={handleClick2}>
                  Finalizar
                  </Button>
                  <Topes niveles={state} handleChange={handleChange} />
                  </>
                  :
                  <Button variant="contained" color="primary" className={classes.button} onClick={handleClick1}>
                      Ver Topes
                  </Button>
                }
              </Grid>
            </DndProvider>
          </Grid>
      </main>
    </div>
  );
}
