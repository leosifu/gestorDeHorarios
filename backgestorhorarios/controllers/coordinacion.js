const Coordinacion = require('../models').Coordinacion
const Asignatura = require('../models').Asignatura
const Bloques = require('../models').Bloque
const Bloque = require('./bloque')
const AsingCoord = require('./infoCoordinacion')

module.exports = {
  create(req, res){
    return Coordinacion
      .create({
        tipo_coord: req.body.tipo_coord,
      })
      .then(async coordinacion => {
        var data = {
          body:{
            coordinacionId: coordinacion.dataValues.id,
            cod_coord: req.body.cod_coord,
            nombre_coord: req.body.nombre_coord,
            asignaturaId: req.body.asignaturaId,
            infoC_id: req.body.asignaturaId + '~' + req.body.cod_coord + '~' + req.body.nombre_coord
          }
        }
        const NewInfoCoordinacion = await AsingCoord.create(data)
        if (!NewInfoCoordinacion) {
          coordinacion.destroy();
          return(res.status(400));
        }
        var bloques = []
        for (var i = 0; i < req.body.num_bloques; i++) {
          bloques.push({coordinacionId: coordinacion.dataValues.id})
        }
        Bloque.create(bloques, res)
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
}
