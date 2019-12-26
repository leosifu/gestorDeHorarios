const Carrera = require('../models').Carrera
const Malla = require('../models').Malla

module.exports = {
  create(req,res){
    return Carrera
      .create({
        cod_carrera: req.body.cod_carrera,
        nombre_carrera: req.body.nombre_carrera,
        jornada: req.body.jornada
      })
      .then(carrera => res.status(201).send(carrera))
      .catch(error=> res.status(400).send(error))
  },
  findCarreras(req, res){
    return Carrera
      .findAll({
      })
      .then(carrera =>res.send(carrera))
      .catch(error=> res.status(400).send(error))
  },
  findAll(req,res){
    return Carrera
      .findAll({
        include: [{model:Malla, as:'mallas', where:{activa: true}}]
      })
      .then(carrera =>res.send(carrera))
      .catch(error=> res.status(400).send(error))
  },
  findByCarreraId(req, res){
    var id = req.params.id
    return Carrera
      .findAll({
        where: {id:id},
        include: [{model:Malla, as:'mallas'}]
      })
      .then(carrera =>res.json(carrera))
      .catch(error=> res.status(400).send(error))
  },
  update(req,res){
    return Carrera
      .update({
        cod_carrera: req.body.cod_carrera,
        nombre_carrera: req.body.nombre_carrera,
        jornada: req.body.jornada,
        carrera_activa: req.body.carrera_activa,
        mostrar_carrera: req.body.mostrar_carrera
      },{
        where:{id:req.params.id}
      })
      .then(carrera => res.status(201).send(carrera))
      .catch(error=> res.status(400).send(error))
  },

}
