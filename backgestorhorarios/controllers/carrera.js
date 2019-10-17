const Carrera = require('../models').Carrera
const Malla = require('../models').Malla

module.exports = {
  create(req,res){
    console.log(req.body);
    return Carrera
      .create({
        cod_carrera: req.body.cod_carrera,
        nombre_carrera: req.body.nombre_carrera,
        jornada: req.body.jornada
      })
      .then(carrera => res.status(201).send(carrera))
      .catch(error=> res.status(400).send(error))
  },
  findAll(req,res){
    return Carrera
      .findAll({
        include: [{model:Malla, as:'mallas'}]
      }).then(carrera =>res.json(carrera))
  },
  findByCarreraId(req, res){
    var id = req.params.id
    return Carrera
      .findAll({
        where: {id:id},
        include: [{model:Malla, as:'mallas'}]
      }).then(carrera =>res.json(carrera))
  }

}
