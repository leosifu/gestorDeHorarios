import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import {FormLabel, FormControl, FormGroup, FormControlLabel, Checkbox, InputLabel,
  Select, Input, ListItemText, MenuItem, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    width: '40%',
    margin: theme.spacing(3),
  },
  check: {
    width: 16,
    height: 16,
    margin: 10,
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: 'orange',
    '&$checked': {
      color: 'orange'
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

function Topes({topes, handleChange, niveles, selectNivel, }){

  const classes = useStyles();

  return(
    <>
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-checkbox-label">Seleccionar Nivel</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        value={topes}
        multiple
        // onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => {
          const selectsAux = selected.map(select => select + 1)
          return ('Nivel ' + selectsAux.join(', '))
        }}
      >
        {niveles.map((nivel, i) =>
            <MenuItem key={nivel} value={i+1} name={i}>
              <Checkbox checked={topes.indexOf(i+1) > -1} onChange={() => handleChange(i+1)}/>
              <ListItemText primary={nivel} onClick={() => selectNivel(i+1)}/>
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
    {/*<FormControl required component="fieldset" className={classes.formControl}>
      <FormGroup>
        {
          topes.map((nivel, i)=>(
              <FormControlLabel
                control={<GreenCheckbox checked={nivel} className={classes.check}
                  onChange={handleChange(i)} value={nivel} />}
                label={'Nivel ' + (i+1)}
              />
            ))
        }
      </FormGroup>
    </FormControl>*/}
    </>
  )
}
export default Topes
