const carreraController = require('../controllers').carrera
const mallaController = require('../controllers').malla
const asignaturaController = require('../controllers').asignatura
const historialController = require('../controllers').historial

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
  app.get('/api/asignatura', asignaturaController.findAll)
  app.post('/api/asignatura', asignaturaController.create)
}
