const Asignatura = require('../models').Asignatura
const Malla = require('../models').Malla

module.exports = {
  create(req,res){
    return Asignatura
      .create({
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        tel_T: req.body.tel_T,
        tel_E: req.body.tel_E,
        tel_L: req.body.tel_T,
        asignaturaId: req.body.asignaturaId
      })
      .then(asignatura => res.status(201).send(asignatura))
      .catch(error=> res.status(400).send(error))
  },
}
