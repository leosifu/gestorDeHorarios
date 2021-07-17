import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import clientAxios from '../../config/axios';
import baseUrl from '../../config/urls';

import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, List, Stepper, Step, StepLabel, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import PrimaryButton from '../utils/PrimaryButton';
import SecondaryButton from '../utils/SecondaryButton';
import TextField from '../utils/TextField';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import {setLoading, setProcesoActivo, getProcesos, handleNotifications, } from '../../redux/actions'

import SelectProceso from './selectProceso';
import ShowCarrera from './showCarrera';
import ProfesoresUploader from './profesoresUploader';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px 0px 20px 0px',
    width: '100%'
  },
  listaCarreras: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    margin: '2% 10% 2% 30%'
  },
  buttons: {
    margin: '10px 30px 10px 30px'
  }
}));

const ProcesoSelector = createSelector(
  state => state.proceso,
  proceso => proceso.currentProceso
);

const ProcesosSelector = createSelector(
  state => state.proceso,
  proceso => proceso.procesos
);

const UserSelector = createSelector(
  state => state.user,
  user => user
);

const getSteps = () => {
  return ['Datos Generales', 'Listado de profesores (Opcional)', 'Proceso Base'];
}

export default function NuevoProceso() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const steps = getSteps();

  const currentProceso = useSelector(ProcesoSelector);
  const procesos = useSelector(ProcesosSelector);
  const userRedux = useSelector(UserSelector);

  const {user} = userRedux;

  const [carrerasV, setCarrerasV] = useState([]);
  const [carrerasD, setCarrerasD] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [procesoData, setProcesoData] = useState({
    año: 0,
    semestre: 0
  });
  const [date, setDate] = useState({});
  const [procesoselects, setProcesoselects] = useState(currentProceso);
  const [allSelects, setAllSelects] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const procesoFind = procesos.find(proceso => proceso.año === date.age &&
      proceso.semestre === date.semester);
    if (procesoFind) {
      setProcesoselects(procesoFind);
    }
    else {
      setProcesoselects(currentProceso);
    }
    dispatch(setLoading());
  }, [date, procesos, currentProceso]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (procesoselects.id !== -1) {
          const {data} = await clientAxios(user.idToken).get(`/api/carrera/${procesoselects.id}`);
          console.log(data);
          setCarreras(data);
        }
      } catch (e) {
          console.log(e);
      } finally {
        dispatch(setLoading(false));
      }
    }
    setAllSelects([]);
    fetchData();
  }, [procesoselects]);

  if (userRedux.status !== 'login' || !user.roles.includes('admin')) {
    return (
      <Redirect to='/' />
    )
  }

  const changeProcesoData = (event) => {
    setProcesoData({...procesoData, [event.target.id]: event.target.value})
  }


  const crearProceso = async () => {
    console.log(procesoData);
    console.log(allSelects);
    dispatch(setLoading(true));
    try {
      const mallasSelected = [].concat(...allSelects.map(carrera => carrera.selects));
      const NuevoProceso = await clientAxios(user.idToken).post('/api/procesos', procesoData);
      console.log('cree proceso...');
      if (uploadFile) {
        let formData = new FormData();
        console.log(uploadFile);
        formData.append('file', uploadFile);
        console.log(formData);
        formData.append('procesoId', NuevoProceso.data.id);
        const config = {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
        console.log('encontre archivo....');
        const SubirProfesores = await axios.post(`${baseUrl}/api/profesores`,
          formData,
          config
        )
      }
      console.log('pues aca igual...');
      const data = {
        procesoId: NuevoProceso.data.id,
        // procesoId: 1,
        carreras: allSelects,
        fileUploaded : uploadFile ? true: false
      }
      console.log('todavia voy...');
      console.log(data);
      const DuplicarDatos = await clientAxios(user.idToken).post('/api/nuevoProceso', data);
      console.log('termineeeee');
      dispatch(getProcesos(user.idToken))
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'success',
        message: 'Proceso creado correctamente'}
      ));
      // dispatch(push('/'));
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
      dispatch(handleNotifications(true, {
        status: 'error',
        message: 'Ocurrió un error al crear el proceso'}
      ));
    }

  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBackLast = () => {
    setUploadFile(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const firstDisable = () => procesoData.año > 0 || procesoData.semestre > 0;

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{marginTop: 30}}>
        {
          {
            0:
            <>
              <div style={{marginLeft: '15%', marginBottom: 30}}>
                <Grid container>
                  <Grid item xs={6}>
                    <TextField
                      id="año"
                      label="Año"
                      variant="outlined"
                      value={procesoData.año}
                      onChange={changeProcesoData}
                      style={{width: 200}}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="semestre"
                      label="Semestre"
                      variant="outlined"
                      value={procesoData.semestre}
                      onChange={changeProcesoData}
                      style={{width: 200}}
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid container justify="center">
                <PrimaryButton title={'Siguiente'} onClick={handleNext} disabled={!firstDisable} />
              </Grid>
            </>,
            1:
            <>
              <div style={{marginBottom: 20}}>
                <ProfesoresUploader uploadFile={uploadFile} setUploadFile={setUploadFile}/>
              </div>
              <Grid container justify="center">
                <div className={classes.buttons}>
                  <SecondaryButton title={'Atrás'} onClick={handleBack} />
                </div>
                <div className={classes.buttons}>
                  <PrimaryButton title={'Siguiente'} onClick={handleNext} disabled={false}/>
                </div>
              </Grid>
            </>,
            2:
            <>
              <div style={{margin: '20px 0px 20px 30%'}}>
                {
                  procesoselects && procesos.length > 0 &&
                  <SelectProceso procesos={procesos} currentProceso={procesoselects} date={date}
                    setDate={setDate}/>
                }
              </div>
              <Typography variant="h6" style={{margin: '20px 0px 0px 30%'}}>
                Carreras
              </Typography>
              <div style={{margin: '0px 0px 20px 25%'}}>
                <Grid container justify="center">
                  <List dense className={classes.listaCarreras}>
                    {
                      carreras.map(carrera => (
                        <ShowCarrera carrera={carrera} allSelects={allSelects}
                          setAllSelects={setAllSelects} />
                      ))
                    }
                  </List>
                </Grid>
              </div>
              <Grid container justify="center">
                <div className={classes.buttons}>
                  <SecondaryButton title={'Atrás'} onClick={handleBack} />
                </div>
                <div className={classes.buttons}>
                  <PrimaryButton title={'Crear Nuevo Proceso'} onClick={crearProceso} disabled={false}/>
                </div>
              </Grid>
            </>
          }[activeStep]
        }
      </div>
      {/*<Grid container>
        <Grid item xs={procesos.length > 0 ? 4 : 6}>
          <TextField
            id="año"
            label="Año"
            variant="outlined"
            value={procesoData.año}
            onChange={changeProcesoData}
          />
        </Grid>
        <Grid item xs={procesos.length > 0 ? 4 : 6}>
          <TextField
            id="semestre"
            label="Semestre"
            variant="outlined"
            value={procesoData.semestre}
            onChange={changeProcesoData}
          />
        </Grid>
        <Grid item xs={procesos.length > 0 ? 4 : 0}>
        {
          procesoselects && procesos.length > 0 &&
          <SelectProceso procesos={procesos} currentProceso={procesoselects} date={date}
            setDate={setDate}/>
        }
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={8}>
          <Grid container justify="center">
            <List dense className={classes.listaCarreras}>
              {
                carreras.map(carrera => (
                  <Grid item xs={4}>
                    <ShowCarrera carrera={carrera} allSelects={allSelects}
                      setAllSelects={setAllSelects} />
                  </Grid>
                ))
              }
            </List>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <div style={{marginBottom: 20}}>
            <ProfesoresUploader uploadFile={uploadFile} setUploadFile={setUploadFile}/>
          </div>
          <PrimaryButton onClick={crearProceso} title='Crear Proceso' />
        </Grid>
      </Grid>*/}

    </div>
  );
}
