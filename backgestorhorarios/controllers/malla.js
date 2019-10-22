const Malla = require('../models').Malla
const Carrera = require('../models').Carrera

module.exports = {
  create(req,res){
    console.log(req.body);
    return Malla
      .create({
        cod_malla: req.body.cod_malla,
        nombre_malla: req.body.nombre_malla,
        n_niveles: req.body.n_niveles,
        carreraId: req.body.carreraId
      })
      .then(malla => res.status(201).send(malla))
      .catch(error=> res.status(400).send(error))
  },
  findAll(req,res){
    return Malla
      .findAll({
      }).then(malla =>res.json(malla))
  },
  update(req, res){
    return Malla
      .update({
        cod_malla: req.body.cod_malla,
        nombre_malla: req.body.nombre_malla,
        n_niveles: req.body.n_niveles,
      },{
        where:{id:req.params.id}
      })
      .then(malla => res.status(201).send(malla))
      .catch(error=> res.status(400).send(error))
  }
}
