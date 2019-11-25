const Dependencia = require('../models').Dependencia
const HistorialC = require('./historial')

module.exports = {
  crearDependencia(req, res){
    return Dependencia
      .create({
        requisitoId: req.body.requisitoId,
        asignaturaId: req.body.asignaturaId
      })
      .then(dependencia => {
        console.log(dependencia)

        HistorialC.findHistorial(req.body.asignaturaId)
        return res.json(dependencia)
      })
      .catch(error=> {
        console.log(error);
      })
  },
  removeDependencia(req, res){
    console.log(req.body);
    Dependencia.findOne({
      where: {
        requisitoId: req.body.requisitoId,
        asignaturaId: req.body.asignaturaId
      }
    })
    .then(dependencia=>{
      HistorialC.findHistorial(req.body.asignaturaId)
      dependencia.destroy()
      res.json(dependencia)
    })
  }
}
