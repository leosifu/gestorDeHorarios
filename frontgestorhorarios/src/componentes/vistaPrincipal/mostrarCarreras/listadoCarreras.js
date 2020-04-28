import React, {useState, useEffect, useCallback} from 'react'

import axios from 'axios'
import clientAxios from '../../../config/axios'

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, Fab, } from '@material-ui/core';

import CSVReader from 'react-csv-reader'
import {useDropzone} from 'react-dropzone'
import XLSX from 'xlsx';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import {setLoading, setProcesoActivo, } from '../../../redux/actions'

import Carrera from './carrera'
import CrearCarrera from '../formularios/formCarrera/crearCarrera'
import SelectProceso from '../../VistaNuevoProceso/selectProceso'
import OptionsList from './optionsList'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 30,
    flexGrow: 1,
  },
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
  user => user.user
)

export default function ListadoCarreras(){

  const classes = useStyles();
  const dispatch = useDispatch();

  const currentProceso = useSelector(ProcesoSelector);
  const procesos = useSelector(ProcesosSelector);
  const user = useSelector(UserSelector);

  const [openC, setOpenC] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [estado, setEstado] = useState(false);
  const [carrerasD, setCarrerasD] = useState([]);
  const [carrerasV, setCarrerasV] = useState([]);
  const [date, setDate] = useState({});

  useEffect(() => {
    const procesoFind = procesos.find(proceso => proceso.año === date.age &&
      proceso.semestre === date.semester);
    if (procesoFind) {
      dispatch(setProcesoActivo(procesoFind));
    }
  }, [date])

  useEffect(() => {
    if (currentProceso.id !== -1) {
      clientAxios(user.idToken).get(`/api/carrera?procesoId=${currentProceso.id}`)
      .then(res1 => {
        const carreras = res1.data
        var vesp = []
        var diur = []
        for (var i = 0; i < carreras.length; i++) {
          if (carreras[i].jornada === "Vespertino") {
            vesp.push(carreras[i])
          }
          else{
            diur.push(carreras[i])
          }
        }
        setCarrerasV(vesp)
        setCarrerasD(diur)
      })
      dispatch(setLoading(false))
    }
  }, [openC, estado, currentProceso, user])

  // const onDrop = useCallback((acceptedFiles) => {
  //   acceptedFiles.forEach((file) => {
  //     console.log(file);
  //     const reader = new FileReader()
  //
  //     reader.onabort = () => console.log('file reading was aborted')
  //     reader.onerror = () => console.log('file reading has failed')
  //     reader.onload = (e) => {
  //       console.log(e);
  //       const bstr = e.target.result;
  //       const wb = XLSX.read(bstr, {type:'binary'});
  //     // Do whatever you want with the file contents
  //       const binaryStr = reader.result
  //       console.log(binaryStr)
  //     }
  //     reader.readAsArrayBuffer(file)
  //   })
  //
  // }, [])
  //
  // const {getRootProps, getInputProps} = useDropzone({onDrop})
  //
  // const handleUpload = (e) => {
  //   e.preventDefault();
  //
  //   var files = e.target.files, f = files[0];
  //   var reader = new FileReader();
  //   reader.onload = function (e) {
  //       var data = e.target.result;
  //       let readedData = XLSX.read(data, {type: 'binary'});
  //       const wsname = readedData.SheetNames[0];
  //       const ws = readedData.Sheets[wsname];
  //
  //       /* Convert array to json*/
  //       const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
  //       //setFileUploaded(dataParse);
  //       const profesores = dataParse.filter(row=>row.length>1)
  //       console.log(profesores);
  //       clientAxios().post('/api/profesores', profesores)
  //       .then(res=>{
  //         console.log(res);
  //       })
  //       .catch(error=>{
  //         console.log(error);
  //       })
  //   };
  //   reader.readAsBinaryString(f)
  // }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    console.log(acceptedFiles);
    axios.post(`http://localhost:8000/api/profesores`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(res => {
      console.log(res);
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={procesos.length > 0 ? 8 : 9}>
          <h2>Carreras Diurnas</h2>
        </Grid>
        <Grid item xs={procesos.length > 0 ? 1 : 0}>
          {
            procesos.length > 0 && currentProceso.id !== -1 &&
            <SelectProceso procesos={procesos} date={date} setDate={setDate}
              currentProceso={currentProceso}/>
          }
        </Grid>
        <Grid item xs={procesos.length > 0 ? 2 : 1}>
          <CrearCarrera open={openC} setOpen={setOpenC}/>
        </Grid>
        <Grid item xs={1}>
          <OptionsList />
        </Grid>
      </Grid>
      <Grid container>
        {carrerasD.map((carrera)=>(
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado}/>
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h2>Carreras Vespertinas</h2>
        </Grid>
      </Grid>
      <Grid container>
        {carrerasV.map((carrera)=>(
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado}/>
          </Grid>
        ))}
      </Grid>
      {/*<input type="file" onChange={e=>handleUpload(e)} />*/}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
    </div>

    </div>
  );
}
