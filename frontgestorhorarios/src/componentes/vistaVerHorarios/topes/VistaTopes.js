import React, {useState, useEffect, } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, } from '@material-ui/core';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import VerHorario from '../Horarios/horario/VerHorario';
import HorarioGeneral from '../Horarios/horario/horarioGeneral';
import SelectTopes from './SelectTopes';

const useStyles = makeStyles(theme => ({
  header: {
    paddingRight: 100,
    paddingLeft: 100
  },
}));

const VistaTopes = ({numNiveles, nivel, userRedux, currentProceso, }) => {

  const classes = useStyles();

  const [niveles, setNiveles] = useState([]);

  const [topes, setTopes] = useState([]);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let nivelC = new Array(numNiveles).fill(0);
    const nivelesA = nivelC.map((niv, i) => 'Nivel ' + (i+1))
    setNiveles(nivelesA);
  }, [numNiveles]);

  const handleChange = nivel => {
    console.log(nivel);
    let topesAux = topes.slice();
    let nivelIndex = topesAux.indexOf(nivel);
    if (nivelIndex > -1) {
      topesAux.splice(nivelIndex, 1);
    }
    else {
      topesAux.push(nivel);
    }
    setTopes(topesAux)
  };

  const selectNivel = nivel => {
    setSelected(nivel);
  }

  return (
    <>
      <Grid container className={classes.header}>
        <Grid item xs={6}>
          <Typography>
            Nivel: {nivel}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="flex-start" justify="flex-end" direction="row">
            <SelectTopes topes={topes} handleChange={handleChange} niveles={niveles}
              selectNivel={selectNivel}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={10}>
          <VerHorario nivel={nivel} user={userRedux.user} currentProceso={currentProceso}
            userRedux={userRedux} verTope={true} dontDrag={true}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={10}>
          <DndProvider backend={HTML5Backend}>
          {
            topes.map(niv=>
              <div style={{position:'absolute', opacity: 0.3, width:'100%', zIndex: 1}} key={'Niv' + niv}>
                <HorarioGeneral nivel={niv} user={userRedux.user} currentProceso={currentProceso}
                  userRedux={userRedux} dontDrag={true} selected={selected == niv} verTope={true}
                  tope={true}/>
              </div>
            )
          }
          </DndProvider>
        </Grid>
      </Grid>

    </>
  )
}

export default VistaTopes;
