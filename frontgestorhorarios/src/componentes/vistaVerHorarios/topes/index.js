import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function Topes({niveles, handleChange}){

  const classes = useStyles();

  console.log(niveles);

  return(
    <FormControl required component="fieldset" className={classes.formControl}>
      <FormGroup>
        {
          niveles.map((nivel, i)=>{
            //console.log(nivel);
            return(
              <FormControlLabel
                control={<Checkbox checked={nivel} onChange={handleChange(i)} value={nivel} />}
                label={'Nivel ' + (i+1)}
              />
            )
          })
        }
      </FormGroup>
    </FormControl>
  )
}
export default Topes
