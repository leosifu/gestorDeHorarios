const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura

module.exports = {
  create(req,res){
    console.log(req.body);
    return Malla
      .create({
        res_malla: req.body.res_malla,
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
        res_malla: req.body.res_malla,
        nombre_malla: req.body.nombre_malla,
        n_niveles: req.body.n_niveles,
      },{
        where:{id:req.params.id}
      })
      .then(malla => res.status(201).send(malla))
      .catch(error=> res.status(400).send(error))
  },
  findMallaById(req,res){
    var id = req.params.id
    return Malla
      .findAll({
        where: {id:id},
        include: [{
          model:Asignatura,
          as:'asignaturas',
        }]
      }).then(malla =>{
        const asignaturas = malla[0].dataValues.asignaturas
        var niveles = []
        for (var i = 1; i <= malla[0].dataValues.n_niveles; i++) {
          var algo1 = asignaturas.filter(asignatura=>asignatura.nivel == i)
          var obj = {"nivel": i, asignaturas: algo1}
          niveles.push(obj)
        }
        console.log(niveles);
        malla[0].dataValues["niveles"] = niveles
        delete malla[0].dataValues.asignaturas
        return (res.json(malla))
      })
  },
}
