const Coordinacion = require('../models').Coordinacion
const Asignatura = require('../models').Asignatura

module.exports = {
  create(req, res){
    return Coordinacion
      .create({
        cod_coord: req.body.cod_coord,
        tipo_coord: req.body.tipo_coord,
        nombre_coord: req.body.nombre_coord,
        asignaturaId: req.body.asignaturaId
      })
      .then(coordinacion => {
        return(res.status(201).send(coordinacion))
      })
  },
  updateNum(req, res){
    return Coordinacion
      .update({
        num_asociacion: req.body.num_asociacion
      },{
        where:{id:req.body.ids}
      })
      .then(coordinacion => res.status(201).send(coordinacion))
      .catch(error=> res.status(400).send(error))
  }
}
