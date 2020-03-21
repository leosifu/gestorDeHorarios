import React, {useState, useEffect, useCallback} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CSVReader from 'react-csv-reader'
import {useDropzone} from 'react-dropzone'
import XLSX from 'xlsx';

import clientAxios from '../../../config/axios'

import { useDispatch } from 'react-redux';
import {setLoading} from '../../../redux/actions'

import Carrera from './carrera'
import CrearCarrera from '../formularios/formCarrera/crearCarrera'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 30,
    flexGrow: 1,
  },
}));

export default function ListadoCarreras(){

  const classes = useStyles();
  const dispatch = useDispatch();

  const [openC, setOpenC] = useState(false);

  const [estado, setEstado] = useState(false);

  const [carrerasD, setCarrerasD] = useState([])

  const [carrerasV, setCarrerasV] = useState([])

  useEffect(()=>{
    clientAxios().get('/api/carrera')
    .then(res => {
      console.log(res.data);
      var vesp = []
      var diur = []
      const data = res.data
      for (var i = 0; i < data.length; i++) {
        if (data[i].jornada === "Vespertino") {
          vesp.push(data[i])
        }
        else{
          diur.push(data[i])
        }
      }
      setCarrerasV(vesp)
      setCarrerasD(diur)
      dispatch(setLoading(false))
    })
  }, [openC, estado])

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log(file);
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = (e) => {
        console.log(e);
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })

  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const handleUpload = (e) => {
    e.preventDefault();

    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        let readedData = XLSX.read(data, {type: 'binary'});
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
        //setFileUploaded(dataParse);
        const profesores = dataParse.filter(row=>row.length>1)
        console.log(profesores);
        clientAxios().post('/api/profesores', profesores)
        .then(res=>{
          console.log(res);
        })
        .catch(error=>{
          console.log(error);
        })
    };
    reader.readAsBinaryString(f)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={11}>
          <h2>Carreras Diurnas</h2>
        </Grid>
        <Grid item xs={1}>
          <CrearCarrera open={openC} setOpen={setOpenC}/>
        </Grid>
      </Grid>
      <Grid container>
        {carrerasD.map((carrera)=>(
          <Grid item xs={6}  key={carrera.id}>
            <Carrera carrera={carrera} estado={estado} setEstado={setEstado}/>
          </Grid>
        ))}
      </Grid>
      <br/>
      <Grid container>
        <Grid item xs={11}>
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
        <input type="file" onChange={e=>handleUpload(e)} />

    </div>
  );
}
