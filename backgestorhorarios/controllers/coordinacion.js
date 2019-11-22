const Coordinacion = require('../models').Coordinacion
const Asignatura = require('../models').Asignatura
const Bloques = require('../models').Bloque
const Bloque = require('./bloque')
const AsingCoord = require('./asignCoord')

module.exports = {
  create(req, res){
    console.log(req.body);
    return Coordinacion
      .create({
        tipo_coord: req.body.tipo_coord,
      })
      .then(coordinacion => {
        var data = {
          body:{
            coordinacionId: coordinacion.dataValues.id,
            cod_coord: req.body.cod_coord,
            nombre_coord: req.body.nombre_coord,
            asignaturaId: req.body.asignaturaId
          }
        }
        AsingCoord.create(data)
        var bloques = []
        for (var i = 0; i < req.body.num_bloques; i++) {
          bloques.push({coordinacionId: coordinacion.dataValues.id})
        }
        Bloque.create(bloques)
        return(res.status(201).send(coordinacion))
      })
  },
  findCoordinaciones(req, res){
    return Coordinacion
      .findAll({
        where:{asignaturaId:req.params.id}
      })
      .then(coordinacion => res.status(201).send(coordinacion))
      .catch(error=> res.status(400).send(error))
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
  },
}
