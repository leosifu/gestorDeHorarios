const carreraController = require('../controllers').carrera
const mallaController = require('../controllers').malla

module.exports = (app) => {
  app.get('/api', (req, res)=>res.status(200).send({
    message: 'Welcome toabsdkab'
  }))
  app.get('/api/carrera', carreraController.findAll)
  app.get('/api/carrera/:id', carreraController.findByCarreraId)
  app.post('/api/carrera', carreraController.create)
  app.get('/api/malla', mallaController.findAll)
  app.post('/api/malla', mallaController.create)
}
