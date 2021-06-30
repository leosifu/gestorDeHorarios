import React, {useState, useEffect} from 'react';

import {Paper, Checkbox, FormControlLabel, FormControl, FormGroup, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ShowMalla from './showMalla'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  process: {
    margin: '5%',
    width: '100%'
  }
}));

const ShowCarrera = ({carrera, allSelects, setAllSelects, }) => {

  const classes = useStyles();

  const [carreraSelec, setCarreraSelec] = useState(false);
  const [selects, setSelects] = useState([]);

  // useEffect(() => {
  //   let allSelectsAux = allSelects.slice();
  //   const findCarrera = allSelectsAux.find(carreraAux => carreraAux.nombre_carrera === carrera.nombre_carrera);
  //   const findCarreraIndex = allSelectsAux.indexOf(findCarrera);
  //   findCarrera.selects = selects;
  //   allSelectsAux[findCarreraIndex] = findCarrera;
  //   setAllSelects(allSelectsAux);
  // }, [selects])

  const handleToggle = (value) => () => {
    const currentIndex = allSelects.indexOf(value);
    const newSelects = [...allSelects];

    if (currentIndex === -1) {
      newSelects.push(value);
    } else {
      newSelects.splice(currentIndex, 1);
    }

    setAllSelects(newSelects);
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      const selectsAux = selects.slice();
      for (var i = 0; i < carrera.mallas.length; i++) {
        selectsAux.push(carrera.mallas[i].id)
      }
      setSelects([...new Set(selectsAux)])
    }
    else {
      setSelects([])
    }
  }

  // const selectMalla = (id) => {
  //   const selectsIndex = selects.indexOf(id);
  //   let newselects = [];
  //
  //   if ( selectsIndex === -1 ){
  //     newselects = newselects.concat(selects, id);
  //   }
  //   else if ( selectsIndex === 0 ){
  //     newselects = newselects.concat(selects.slice(1));
  //   }
  //   else if ( selectsIndex === selects.length - 1 ){
  //     newselects = newselects.concat(selects.slice(0, -1));
  //   }
  //   else if ( selectsIndex > 0 ) {
  //     newselects = newselects.concat(
  //       selects.slice(0, selectsIndex),
  //       selects.slice(selectsIndex + 1)
  //     );
  //   }
  //   setSelects(newselects);
  // }

  return(
    <Paper className={classes.process}>
      <ListItem key={carrera.id} button>
        <ListItemText id={carrera.id} primary={`${carrera.nombre} - ${carrera.jornada} (${carrera.año})`} />
        <ListItemSecondaryAction>
          <Checkbox
            edge="end"
            onChange={handleToggle(carrera.id)}
            // checked={checked.indexOf(value) !== -1}
            // inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {/*<FormControl component="fieldset">
        <FormControlLabel
          control={<Checkbox
            indeterminate={selects.length > 0}
            // checked={selects.length === carrera.mallas.length}
            color="primary"
            onChange={selectAll}
          />}
          label={carrera.nombre}
        />
      </FormControl>
      <Divider/>}
      {/*<FormGroup>
      {
        carrera.mallas.map(malla => {
          const isSelected = selects.indexOf(malla.id) !== -1;
          return(
            <ShowMalla malla={malla} key={malla.id} isSelected={isSelected} selectMalla={selectMalla}/>
          )
        })
      }
      </FormGroup>*/}
    </Paper>
  )
}

export default ShowCarrera;
