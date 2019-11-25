import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
  },
  textFieldNumber:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  campoDes:{
    marginBottom: 10,
    padding: 10,
  },
  textFieldNumber:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
}));

function TelAsignaturaForm({handleOnChange, tel_T, tel_E, tel_L, lab_independiente}){
  const classes = useStyles();
  return(
    <>
      <Grid container>
        <Grid item xs={2}>
          <Typography className={classes.campoDes}>
            TEL:
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            error={tel_T.error ? true:false}
            id="standard-required"
            label="Teoría"
            name="tel_T"
            type="number"
            className={classes.textFieldNumber}
            value={tel_T.value}
            onChange={handleOnChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            error={tel_E.error ? true:false}
            id="standard-required"
            label="Ejercicios"
            name="tel_E"
            type="number"
            className={classes.textFieldNumber}
            value={tel_E.value}
            onChange={handleOnChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            error={tel_L.error ? true:false}
            id="standard-required"
            label="Laboratorio"
            name="tel_L"
            type="number"
            className={classes.textFieldNumber}
            value={tel_L.value}
            onChange={handleOnChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <FormControlLabel
        control={
          <Switch
            checked={lab_independiente.checked}
            onChange={handleOnChange}
            value={lab_independiente.checked}
            color="primary"
            name="lab_independiente"
          />
        }
        label="Laboratorio independiente"
      />
    </>
  )
}
export default TelAsignaturaForm
