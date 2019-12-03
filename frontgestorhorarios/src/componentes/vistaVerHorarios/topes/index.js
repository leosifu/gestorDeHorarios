import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

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
                control={<GreenCheckbox checked={nivel} className={classes.check}
                  onChange={handleChange(i)} value={nivel} />}
                label={'Semestre ' + (i+1)}
              />
            )
          })
        }
      </FormGroup>
    </FormControl>
  )
}
export default Topes
