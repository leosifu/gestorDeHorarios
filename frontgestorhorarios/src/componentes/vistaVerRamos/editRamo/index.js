import React from 'react'
//import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListadoSecciones from '../listadoSecciones'
import EditDatos from './editDatos'


function EditRamo(){
  return(
    <Grid container>
      <Grid item xs={2}>
        <ListadoSecciones />
      </Grid>
      <Grid item xs={5}>
        <EditDatos />
      </Grid>
      <Grid item xs={5}>

      </Grid>
    </Grid>
  )
}
export default EditRamo
