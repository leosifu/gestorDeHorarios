const InfoAsignatura = require('../models').InfoAsignatura
const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura
const Coordinacion = require('../models').Coordinacion
const Bloque = require('../models').Bloque
const HistorialM = require('../models').Historial
const Usuario = require('../models').Usuario
//const AsignaturaC = require('./asignatura')

module.exports = {
  create(req, res){
    const infoA_id = req.body.mallaId + '~' + req.body.cod_asignatura + '~' + req.body.nombre_asignatura
    return InfoAsignatura
      .create({
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        mallaId: req.body.mallaId,
        asignaturaId: req.body.asignaturaId,
        nivel: req.body.nivel,
        infoA_id: infoA_id,
      })
      .then(infoA=>{
          return res.status(201).send(infoA)
      })
      .catch(error=> {
        console.log(error);
        return res.status(400).send(error)
      })
  },
  findAsignaturasByNivel(req, res){
    var id = req.params.id
    var nivel = req.params.nivel
    return InfoAsignatura
      .findAll({
        where: {mallaId:id, nivel: nivel},
        include:[{model:Asignatura, as:'Asignatura',
          include: [{model:Coordinacion, as:'coordinaciones',
            include:[{model: Bloque, as:'bloques'}, {model: Usuario, as: 'profesores'}]}]
        }]
      })
      .then(mallaA=>{
        var asignaturas = mallaA.map(malA=>{
          malA.Asignatura.dataValues.cod_asignatura = malA.cod_asignatura
          malA.Asignatura.dataValues.nombre_asignatura = malA.nombre_asignatura
          return malA.Asignatura
        })
        return(res.json(asignaturas))
      })
      .catch(error=> {
        console.log(error);
        return res.status(400).send(error)
      })
  },
  findAsignatura(req, res){
    return InfoAsignatura
      .findOne({
        where:{mallaId: req.params.mId, asignaturaId: req.params.aId},
        include: [{model:Asignatura, as:'Asignatura',
          include:[{model:HistorialM, as:'historial'},{model:Asignatura, as:'requisitos',
            include:[{model: Malla, as:'mallas', where:{id: req.params.mId}}]},
            {model:Coordinacion, as:'coordinaciones',
              include:[{model: Bloque, as:'bloques'}, {model: Usuario, as: 'profesores'}]
          }]
        }]
      })
      .then(infoA=>{
        console.log(infoA.dataValues);
        console.log(infoA.dataValues.asignaturaId);
        for (var i = 0; i < infoA.dataValues.Asignatura.dataValues.requisitos.length; i++) {
          var req = infoA.dataValues.Asignatura.dataValues.requisitos[i]
          console.log(req);
          var cod_asignatura = req.mallas[0].InfoAsignatura.dataValues.cod_asignatura
          var nombre_asignatura = req.mallas[0].InfoAsignatura.dataValues.nombre_asignatura
          infoA.dataValues.Asignatura.dataValues.requisitos[i].dataValues
            .cod_asignatura = cod_asignatura
          infoA.dataValues.Asignatura.dataValues.requisitos[i].dataValues
            .nombre_asignatura = nombre_asignatura
        }
        return (res.json(infoA))
      })
      .catch(error=> {
        console.log(error);
        return res.status(400).send(error)
      })
  },
  findAsignaturas(req,res){
    return InfoAsignatura
      .findAll({
        where:{mallaId: req.params.id},
      })
      .then(infoA =>{
        return (res.json(infoA))
      })
      .catch(error=> res.status(400).send(error))
  },
  update(req){
    return InfoAsignatura
      .update({
        cod_asignatura: req.cod_asignatura,
        nombre_asignatura: req.nombre_asignatura,
      },{
        where:{asignaturaId:req.asignaturaId, mallaId: req.mallaId}
      })
      .catch(error=> res.status(400).send(error))
  }
}
