import React from 'react';

import {Checkbox, FormControlLabel, FormControl, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ShowMalla = ({malla, isSelected, selectMalla, }) => {

  const classes = useStyles();

  return(
    <FormControl component="fieldset">
      <FormControlLabel
        control={<Checkbox
          color="primary"
          checked={isSelected}
          onChange={() => selectMalla(malla.id)}
        />}
        label={malla.cod_malla}
      />
    </FormControl>
  )
}
export default ShowMalla;
