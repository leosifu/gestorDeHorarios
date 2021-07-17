import React, {useState, useEffect, } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, ButtonGroup, Button, } from '@material-ui/core';

import { green, } from '@material-ui/core/colors';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import VerHorario from '../Horarios/horario/VerHorario';
import HorarioGeneral from '../Horarios/horario/horarioGeneral';
import SelectTopes from './SelectTopes';

const useStyles = makeStyles(theme => ({
  header: {
    paddingRight: 100,
    paddingLeft: 20,
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const VistaTopes = ({numNiveles, nivel, userRedux, currentProceso, carreraId, }) => {

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
    let topesAux = topes.slice();
    let nivelIndex = topesAux.indexOf(nivel);
    if (nivelIndex > -1) {
      topesAux.splice(nivelIndex, 1);
    }
    else {
      topesAux.push(nivel);
    }
    setTopes(topesAux || [])
  };

  const selectNivel = nivel => {
    setSelected(nivel);
  }

  const selectNivelButton = (niv) => {
    const selectsAux = [...selected];
    const indexNiv = selectsAux.indexOf(niv);
    if (indexNiv < 0) {
      selectsAux.push(niv);
    }
    else {
      selectsAux.splice(indexNiv, 1);
    }
    setSelected(selectsAux);
  }

  return (
    <>
      <Grid container className={classes.header}>
        {/*<Grid item xs={3} style={{paddingTop: 35}}>
          <Typography variant="h5">
            Nivel seleccionado: {nivel}
          </Typography>
        </Grid>*/}

        {
          <Grid item xs={9}>
          <div  style={{display: 'flex', marginTop: 40}}>
          <Typography variant="h5" style={{marginRight: 30}}>
          Visualizar topes con
          </Typography>
          <div>
          <ButtonGroup color="primary" size="large"  aria-label="outlined secondary button group">
          {
            niveles.map((nivelMap, i) => {
              if (i === nivel) {
                return (
                  <ColorButton variant="contained">{nivelMap}</ColorButton>
                )
              }
              return (
                <Button variant={topes.includes(i+1) ? "contained" : "outlined"} onClick={() => handleChange(i+1)}>{nivelMap}</Button>
              )
            }
          )
        }
        </ButtonGroup>
        </div>
        </div>

          </Grid>
        }
        {
          /*
          <Grid item xs={9}>
            <Grid container alignItems="flex-start" direction="row">
              <SelectTopes topes={topes} handleChange={handleChange} niveles={niveles}
                nivelS={nivel} selectNivel={selectNivel}/>
            </Grid>
            <div style={{marginLeft: 20}}>
              <ButtonGroup color="primary" size="large"  aria-label="outlined secondary button group">
              {
                niveles.map((nivelMap, i) =>
                <Button variant={topes.includes(i+1) ? "contained" : "outlined"} onClick={() => handleChange(i+1)}>{nivelMap}</Button>
                )
              }
              </ButtonGroup>
            </div>
          </Grid>
          */
        }
      </Grid>
      <Grid container>
        <Grid item xs={10}>
          <VerHorario nivel={nivel} user={userRedux.user} currentProceso={currentProceso}
            userRedux={userRedux} verTope={true} dontDrag={true} topes={topes} carreraId={carreraId}
            tope={true}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={10}>
          <DndProvider backend={HTML5Backend}>
          {/*
            topes.map(niv=>
              <div style={{position:'absolute', opacity: 0.3, width:'100%', zIndex: 1}} key={'Niv' + niv}>
                <HorarioGeneral nivel={niv} user={userRedux.user} currentProceso={currentProceso}
                  userRedux={userRedux} dontDrag={true} selected={selected == niv} verTope={true}
                  tope={true}/>
              </div>
            )
          */}
          </DndProvider>
        </Grid>
      </Grid>
    </>
  )
}

export default VistaTopes;
