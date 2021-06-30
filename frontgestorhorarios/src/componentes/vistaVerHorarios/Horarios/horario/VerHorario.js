import React, {useState, useEffect, } from 'react';

import {Grid, } from '@material-ui/core';

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import HorarioGeneral from './horarioGeneral'

const VerHorario = ({nivel, user, currentProceso, userRedux, dontDrag, verTope, topes, carreraId, niveles, setNivel, }) => {

  const [state, setState] = useState([])

  const widthHorario = verTope ? '100%' : '82%';

  return(
    <DndProvider backend={HTML5Backend}>
      <Grid item xs={12}>
        <div style={{position:'absolute', opacity: 1, width: widthHorario, zIndex: 0}}>
          <HorarioGeneral nivel={nivel} user={userRedux.user} currentProceso={currentProceso}
            userRedux={userRedux} dontDrag={dontDrag} topes={topes} verTope={verTope} carreraId={carreraId}
            niveles={niveles} setNivel={setNivel}
          />
        </div>
      </Grid>
    </DndProvider>
  )
}

export default VerHorario;
