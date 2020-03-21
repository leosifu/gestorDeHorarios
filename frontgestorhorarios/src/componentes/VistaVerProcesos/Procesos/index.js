import React, {useState, useEffect, useCallback} from 'react'

import { useParams, } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';

import axios from 'axios';

import Proceso from './proceso'
import CrearProceso from '../crearProceso'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 30,
    flexGrow: 1,
  },
}));

export default function Procesos(props){
  const classes = useStyles();

  const {carreraId} = useParams();
  const [procesos, setProcesos] = useState([])
  const [open, setOpen] = useState(false)
  const [changed, setChanged] = useState(false)

  useEffect(()=>{
    var link ='http://localhost:8000/api/mallas/' + carreraId
    axios.get(link)
    .then(res=>{
      console.log(res.data);
      setProcesos(res.data)
    })
  }, [changed])

  return(
    <div className={classes.root}>
      <CrearProceso open={open} setOpen={setOpen} changed={changed} setChanged={setChanged}/>
      <Grid container>
        {procesos.map((proceso)=>(
          <Grid item xs={6}  key={proceso.id}>
            <Proceso proceso={proceso}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
