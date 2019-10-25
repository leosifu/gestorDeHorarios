const Asignatura = require('../models').Asignatura
const Malla = require('../models').Malla
const Historial = require('./historial')

module.exports = {
  create(req,res){
    return Asignatura
      .create({
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        tel_T: req.body.tel_T,
        tel_E: req.body.tel_E,
        tel_L: req.body.tel_T,
        nivel: req.body.nivel,
        mallaId: req.body.mallaId
      })
      .then(asignatura => {
        Historial.create(req)
        return(res.status(201).send(asignatura))
      })
      .catch(error=> res.status(400).send(error))
  },
  findAll(req,res){
    return Asignatura
      .findAll({
      }).then(asignatura =>res.json(asignatura))
  }
}
