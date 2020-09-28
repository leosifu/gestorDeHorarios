const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura
const Historial = require('../models').Historial
const Coordinacion = require('../models').Coordinacion
const Proceso = require('../models').Proceso
const Carrera = require('../models').Carrera

module.exports = {
  createMalla(req,res){
    return Malla
      .create({
        fecha_resolucion: req.body.fecha_resolucion,
        cod_malla: req.body.cod_malla,
        n_niveles: req.body.n_niveles,
        cod_resolucion: req.body.cod_resolucion,
        carreraId: req.body.carreraId,
        procesoId: req.body.procesoId
      })
      .then(malla => {
        return(res.status(201).send(malla))
      })
      .catch(error=> {
        console.log(error);
        return(res.status(400).send(error))
      })
  },
  findAll(req,res){
    return Malla
      .findAll({
      })
      .then(malla =>res.json(malla))
      .catch(error=> res.status(400).send(error))
  },
  findMallas(req, res){
    return Malla
      .findAll({
        where: {carreraId: req.params.id}
      })
      .then(malla =>res.json(malla))
      .catch(error=> res.status(400).send(error))
  },
  updateMalla(req, res){
    return Malla
      .update({
        fecha_resolucion: req.body.fecha_resolucion,
        cod_malla: req.body.cod_malla,
        cod_resolucion: req.body.cod_resolucion,
        n_niveles: req.body.n_niveles,
      },{
        where:{id:req.params.id}
      })
      .then(malla => res.status(201).send(malla))
      .catch(error=> res.status(400).send(error))
  },
  findMallaById(req,res){
    const {mallaId, procesoId} = req.params;
    return Malla
      .findAll({
        where: {id:mallaId},
        include: [{
          model:Asignatura,
          as:'asignaturas',
        }, {
          model: Carrera,
          as: 'Carrera'
        }]
      })
      .then(malla =>{
        if (!malla) {
          return res.status(404).send({message: 'Malla no encontrada'})
        }
        const asignaturas = malla[0].dataValues.asignaturas
        var niveles = []
        for (var i = 1; i <= malla[0].dataValues.n_niveles; i++) {
          var algo1 = asignaturas.filter(asignatura=>asignatura.InfoAsignatura.dataValues.nivel == i)
          var obj = {"nivel": i, asignaturas: algo1}
          niveles.push(obj)
        }
        malla[0].dataValues["niveles"] = niveles
        delete malla[0].dataValues.asignaturas
        return (res.json(malla))
      })
      .catch(error=> {
        console.log(error);
        return res.status(400).send(error)
      })
  },
  findMallaByAño(req, res){
    const {id, año, semestre} = req.params
    return Malla
    .findAll({
      where: {carreraId: id, año: año, semestre: semestre}
    })
    .then(malla => res.status(201).send(malla))
    .catch(error=>{
      console.log(error);
      res.status(400).send(error)
    })
  },
  cambiarEstadoMalla(req, res){
    return Malla
      .update({
        activa: req.body.activa
      },{
        where: {id: req.params.id}
      })
      .then(malla=>{
        console.log(malla);
        res.status(201).send(malla)
      })
      .catch(error=>{
        console.log(error);
        res.status(400).send(error)
      })
  },
  async deleteMalla(req, res){
    try {
      const {mallaId} = req.params;
      const mallaDelete = await Malla.findOne({
        where: {id: mallaId}
      })
      await mallaDelete.destroy();
      return res.status(201).send({message: 'Malla eliminada'})
    } catch (e) {
      return res.status(400).send({message: 'Error al eliminar la malla'})
    }
  }
}
