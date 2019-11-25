const InfoAsignatura = require('../models').InfoAsignatura
const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura
const Coordinacion = require('../models').Coordinacion
const Bloque = require('../models').Bloque
const HistorialM = require('../models').Historial
//const AsignaturaC = require('./asignatura')

module.exports = {
  create(req, res){
    return InfoAsignatura
      .create({
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        mallaId: req.body.mallaId,
        asignaturaId: req.body.asignaturaId,
        nivel: req.body.nivel,
      })
      .then(infoA=>res.json(infoA))

  },
  findAsignaturasByNivel(req, res){
    var id = req.params.id
    var nivel = req.params.nivel
    return InfoAsignatura
      .findAll({
        where: {mallaId:id, nivel: nivel},
        include:[{model:Asignatura, as:'Asignatura',
          include: [{model:Coordinacion, as:'coordinaciones',
            include:[{model: Bloque, as:'bloques'}]}]
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
  },
  findAsignatura(req, res){
    return InfoAsignatura
      .findOne({
        where:{mallaId: req.params.mId, asignaturaId: req.params.aId},
        include: [{model:Asignatura, as:'Asignatura',
          include:[{model:HistorialM, as:'historial'},{model:Asignatura, as:'requisitos'},
            {model:Coordinacion, as:'coordinaciones', include:[{model: Bloque, as:'bloques'}]
          }]
        }]
      })
      .then(infoA=>{
        return (res.json(infoA))
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
  },
}
