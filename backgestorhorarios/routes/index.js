const carreraController = require('../controllers').carrera
const mallaController = require('../controllers').malla
const asignaturaController = require('../controllers').asignatura
const historialController = require('../controllers').historial
const dependenciaController = require('../controllers').dependencia
const coordinacionController = require('../controllers').coordinacion

module.exports = (app) => {
  app.get('/api', (req, res)=>res.status(200).send({
    message: 'Welcome toabsdkab'
  }))
  //API carrera
  app.get('/api/carrera', carreraController.findAll)
  app.get('/api/carrera/:id', carreraController.findByCarreraId)
  app.post('/api/carrera', carreraController.create)
  app.put('/api/carrera/:id', carreraController.update)

  //API malla
  app.get('/api/malla', mallaController.findAll)
  app.get('/api/malla/:id', mallaController.findMallaById)
  app.post('/api/malla', mallaController.create)
  app.put('/api/malla/:id', mallaController.update)

  //API asignatura
  //app.get('/api/asignatura', asignaturaController.findAll)
  app.get('/api/asignatura/:id', asignaturaController.findAsignatura)
  app.get('/api/asignaturaReq/:id', asignaturaController.getRequisitos)
  app.get('/api/asignatura/:id/:nivel', asignaturaController.findAsignaturasByNivel)
  app.post('/api/asignatura', asignaturaController.create)
  //Api dependencia
  app.post('/api/dependencia', dependenciaController.crearDependencia)
  app.delete('/api/dependencia', dependenciaController.removeDependencia)

  //Api coordinacion
  //app.get('/api/coordinacion', coordinacionController.findAll)
  app.post('/api/coordinacion', coordinacionController.create)
}
