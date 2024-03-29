const carreraController = require('../controllers').newcarrera
const mallaController = require('../controllers').malla
const asignaturaController = require('../controllers').asignatura
const historialController = require('../controllers').historial
const dependenciaController = require('../controllers').dependencia
const coordinacionController = require('../controllers').coordinacion
const bloqueController = require('../controllers').bloque
const infocoordController = require('../controllers').infocoordinacion
const infoasignaturaController = require('../controllers').infoasignatura
const nuevoProcesoController = require('../controllers').nuevoProceso
const usuarioController = require('../controllers').usuario
const procesoController = require('../controllers').proceso
// const routes = require('../controllers/uploadCsv')
const verify = require('../Authorization/verify');
const checkProceso = require('../Authorization/checkProceso');
const multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

module.exports = (app) => {
  app.get('/api', (req, res)=>res.status(200).send({
    message: 'Welcome toabsdkab'
  }))
  //API carrera
  app.get('/api/carreras', verify('admin', 'coordinador'), carreraController.findCarreras)
  app.get('/api/carrera/:procesoId', checkProceso(), carreraController.findAllCarrerasByProceso)
  app.get('/api/carrera/:carreraId/:procesoId', checkProceso(), carreraController.getAsignaturasByCarrera)
  // app.get('/api/carrera/:id', carreraController.findByCarreraId)
  app.post('/api/carrera', verify('admin', 'coordinador'), carreraController.createCarrera)
  app.put('/api/carrera/:id', verify('admin', 'coordinador'), carreraController.updateCarrera)
  app.delete('/api/carrera/:carreraId', verify('admin'), carreraController.deleteCarrera)

  //API malla
  // app.get('/api/malla', mallaController.findAll)
  app.get('/api/mallas/:id', verify('admin', 'coordinador'), mallaController.findMallas)
  // app.get('/api/mallas/:id/:año/:semestre', mallaController.findMallaByAño)
  app.get('/api/malla/:carreraId/:procesoId', checkProceso(), mallaController.findMallaById)
  app.post('/api/malla', verify('admin', 'coordinador'), mallaController.createMalla)
  app.put('/api/malla/:id', verify('admin', 'coordinador'), mallaController.updateMalla)
  app.delete('/api/malla/:mallaId', verify('admin', 'coordinador'), mallaController.deleteMalla)

  //API infoAsignatura
  app.get('/api/asignatura/:carreraId/:nivel/:procesoId', checkProceso(), verify(),
    infoasignaturaController.findAsignaturasByNivel)
  app.get('/api/asignaturaInfo/:carreraId/:aId/:procesoId', checkProceso(),
    infoasignaturaController.findAsignatura)
  app.post('/api/infoAsignatura', verify('admin', 'coordinador'),
    infoasignaturaController.createInfoAsignatura)
  app.get('/api/asignaturas/:carreraId', verify('admin', 'coordinador'),
    infoasignaturaController.findAsignaturas)
  app.delete('/api/infoAsignatura/:carreraId/:asignaturaId', verify('admin', 'coordinador'),
    infoasignaturaController.deleteAsignaturaFromMalla)

  //API asignatura
  //app.get('/api/asignH/:id', asignaturaController.actualizarHistorial)
  app.get('/api/asignaturaReq/:id/:mallaId/:procesoId', checkProceso(),
    asignaturaController.getRequisitos)
  app.post('/api/asignatura', verify('admin', 'coordinador'), asignaturaController.createAsignatura)
  app.put('/api/asignatura/:aId/:carreraId', verify('admin', 'coordinador'),
    asignaturaController.updateAsignatura)

  //Api dependencia
  app.post('/api/dependencia', verify('admin', 'coordinador'), dependenciaController.crearDependencia)
  app.delete('/api/dependencia', verify('admin', 'coordinador'),
    dependenciaController.removeDependencia)

  //Api historial
  app.put('/api/historial/:id', verify('admin', 'coordinador'), historialController.updateHistorial)

  //Api InfoCoordinacion
  //app.post('/api/coordinacion', coordinacionController.create)
  app.get('/api/coordinacions/:id', verify('admin', 'coordinador'), infocoordController.findCoords)
  app.post('/api/asigncoord', verify('admin', 'coordinador'), infocoordController.create)
  app.delete('/api/infoCoordinacion/:asignaturaId/:coordinacionId', verify('admin', 'coordinador'),
    infocoordController.deleteCoordinacionFromAsignatura)

  //Api coordinacion
  app.post('/api/coordinacion', verify('admin', 'coordinador'), coordinacionController.createCoordinacion)
  app.put('/api/coordinacion/:coordinacionId/:asignaturaId', coordinacionController.updateCoordinacion)

  //Api bloque
  app.post('/api/bloque/:id', verify('admin', 'coordinador'), bloqueController.updateNumBloque)

  //Api usuarios
  app.post('/api/login', usuarioController.login)
  // app.get('/api/profesores', verify('admin', 'coordinador'), usuarioController.getProfesores)
  app.get('/api/usuarios', verify('admin'), usuarioController.getUsuarios)
  app.get('/api/profesores/:procesoId', verify('admin', 'coordinador'),
    usuarioController.getProfesores)
  app.post('/api/profesores', upload.single('file'),
    usuarioController.createProfesores)
  app.post('/api/createUsuario', verify('admin'), usuarioController.addUsuario)
  app.put('/api/editUsuario/:id', verify('admin'), usuarioController.editUsuario)
  app.get('/api/getHorario/:usuarioId/:procesoId', usuarioController.getHorario)

  //Api proceso
  app.get('/api/procesos', procesoController.findAll)
  app.post('/api/procesos', verify('admin'), procesoController.create)
  app.put('/api/procesos/:procesoId', verify('admin'), procesoController.changeProcesoStatus)
  app.delete('/api/procesos/:procesoId', verify('admin'), procesoController.EliminarProceso)

  //Api nuevoProceso
  app.post('/api/nuevoProceso', verify('admin'), nuevoProcesoController.createProceso)

}
