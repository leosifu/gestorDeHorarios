const Coordinacion = require('../models').Coordinacion
const Asignatura = require('../models').Asignatura
const Bloque = require('./bloque')

module.exports = {
  create(req, res){
    console.log(req.body);
    return Coordinacion
      .create({
        cod_coord: req.body.cod_coord,
        tipo_coord: req.body.tipo_coord,
        nombre_coord: req.body.nombre_coord,
        asignaturaId: req.body.asignaturaId
      })
      .then(coordinacion => {
        var bloques = []
        for (var i = 0; i < req.body.num_bloques; i++) {
          bloques.push({coordinacionId: coordinacion.dataValues.id, num_orden_bloque: i})
        }
        console.log(bloques);
        Bloque.create(bloques)
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
