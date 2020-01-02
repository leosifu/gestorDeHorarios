const carreraController = require('../controllers').carrera
const mallaController = require('../controllers').malla
const asignaturaController = require('../controllers').asignatura
const historialController = require('../controllers').historial
const dependenciaController = require('../controllers').dependencia
const coordinacionController = require('../controllers').coordinacion
const bloqueController = require('../controllers').bloque
const infocoordController = require('../controllers').infocoordinacion
const infoasignaturaController = require('../controllers').infoasignatura
const nuevoProcesoController = require('../controllers').nuevoProceso
const profesorController = require('../controllers').profesor
const routes = require('../controllers/uploadCsv')

module.exports = (app) => {
  app.get('/api', (req, res)=>res.status(200).send({
    message: 'Welcome toabsdkab'
  }))
  //API carrera
  app.get('/api/carrera', carreraController.findAll)
  app.get('/api/carreras', carreraController.findCarreras)
  app.get('/api/carrera/:id', carreraController.findByCarreraId)
  app.post('/api/carrera', carreraController.create)
  app.put('/api/carrera/:id', carreraController.update)

  //API malla
  app.get('/api/malla', mallaController.findAll)
  app.get('/api/mallas/:id', mallaController.findMallas)
  app.get('/api/malla/:id', mallaController.findMallaById)
  app.post('/api/malla', mallaController.create)
  app.put('/api/malla/:id', mallaController.update)
  app.put('/api/malla/estado/:id', mallaController.cambiarEstadoMalla)

  //API infoAsignatura
  app.get('/api/asignatura/:id/:nivel', infoasignaturaController.findAsignaturasByNivel)
  app.get('/api/asignaturaInfo/:mId/:aId', infoasignaturaController.findAsignatura)
  app.post('/api/infoAsignatura', infoasignaturaController.create)
  app.get('/api/asignaturas/:id', infoasignaturaController.findAsignaturas)

  //API asignatura
  //app.get('/api/asignH/:id', asignaturaController.actualizarHistorial)
  app.get('/api/asignaturaReq/:id', asignaturaController.getRequisitos)
  app.post('/api/asignatura', asignaturaController.create)
  app.put('/api/asignatura/:aId/:mId', asignaturaController.update)

  //Api dependencia
  app.post('/api/dependencia', dependenciaController.crearDependencia)
  app.delete('/api/dependencia', dependenciaController.removeDependencia)

  //Api historial
  app.put('/api/historial/:id', historialController.update)

  //Api AsignCoord
  //app.post('/api/coordinacion', coordinacionController.create)
  app.get('/api/coordinacions/:id', infocoordController.findCoords)
  app.post('/api/asigncoord', infocoordController.create)

  //Api coordinacion
  app.post('/api/coordinacion', coordinacionController.create)

  //Api bloque
  app.post('/api/bloque/:id', bloqueController.updateNumBloque)
  app.post('/api/bloqueAsoc/:cId', bloqueController.setAsociacion)

  //Api csvs
  // app.use('/api/csv-upload', routes)
  app.post('/api/profesores', profesorController.create)

  //Api nuevoProceso
  app.post('/api/nuevoProceso', nuevoProcesoController.createProceso)
}
