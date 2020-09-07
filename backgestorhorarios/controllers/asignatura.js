const Asignatura = require('../models').Asignatura
const Malla = require('../models').Malla
const Coordinacion = require('../models').Coordinacion
const Historial = require('../models').Historial
const Bloque = require('../models').Bloque
const InfoAsignatura = require('../models').InfoAsignatura
const InfoCoordinacion = require('./infoCoordinacion')

// const CheckCoordinaciones = async (asignaturaId) => {
//   const FindAsignaturas = await InfoCoordinacion.findAll({
//
//   })
// }

module.exports = {
  create(req,res){
    return Asignatura
      .create({
        tel_T: req.body.tel_T,
        tel_E: req.body.tel_E,
        tel_L: req.body.tel_L,
        lab_independiente: req.body.lab_independiente
      })
      .then(async(asignatura) => {
        var data = {
          cod_asignatura: req.body.cod_asignatura,
          nombre_asignatura: req.body.nombre_asignatura,
          mallaId: req.body.mallaId,
          asignaturaId: asignatura.dataValues.id,
          nivel: req.body.nivel,
          infoA_id: req.body.mallaId + '~' + req.body.cod_asignatura + '~' + req.body.nombre_asignatura
        }
        const NewInfoAsignatura = await InfoAsignatura.create(data)
        if (!NewInfoAsignatura) {
          asignatura.destroy()
          return(res.status(400))
        }
        const dataHistorial = {
          ...req.body.historial,
          cupos_estimados: req.body.historial.cupos_pasados * req.body.historial.tasa_reprobacion/100,
          asignaturaId: asignatura.dataValues.id
        }
        const NewHistorial = await Historial.create(dataHistorial)
        if (NewHistorial) {
          return(res.status(201).send(asignatura));
        }
        else {
          await asignatura.destroy();
          await NewInfoAsignatura.destroy();
          return(res.status(400).send(error))
        }
      })
      .catch(error=> {
        console.log(error);
        return res.status(400).send(error)
      })
  },
  findAsignatura(req, res){
    var id = req.params.id
    return Asignatura
      .findAll({
        where: {id:id},
        include: [{model:Asignatura, as:'requisitos'},
          {model:Coordinacion, as:'coordinaciones', include:[{model: Bloque, as:'bloques'}]},
          {model:Historial, as:'historial'}]
      })
      .then(asignatura =>{
        return(res.json(asignatura))
      })
      .catch(error=> {
        console.log(error);
        return(res.status(400).send(error))
      })
  },
  getRequisitos(req, res){
    var id = req.params.id
    return Asignatura
      .findAll({
        where: {id:id},
        include: [{model:Asignatura, as:'requisitos'}]
      })
      .then(asignatura =>{
        return(res.json(asignatura))
      })
      .catch(error=> {
        console.log(error);
        return(res.status(400).send(error))
      })
  },
  findAsignaturasByNivel(req, res){
    const {id, nivel} = req.params;
    return Asignatura
      .findAll({
        where: {mallaId:id, nivel: nivel},
        include: [{model:Coordinacion, as:'coordinaciones', include:[{model: Bloque, as:'bloques'}]}]
      })
      .then(asignatura =>{
        return(res.json(asignatura))
      })
  },
  update(req, res){
    Asignatura.findAll({where: {id: req.params.aId}})
    .then(asignaturaPrevia => {
      var tel_T = parseInt(req.body.tel_T)
      var tel_E = parseInt(req.body.tel_E)
      var tel_L = parseInt(req.body.tel_L)
      var infoA = {
        asignaturaId: req.params.aId,
        mallaId: req.params.mId,
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        nivel: req.body.nivel,
        infoA_id: req.params.mId + '~' + req.body.cod_asignatura + '~' + req.body.nombre_asignatura
      }
      return Asignatura
        .update({
          tel_T: req.body.tel_T,
          tel_E: req.body.tel_E,
          tel_L: req.body.tel_L,
          lab_independiente: req.body.lab_independiente,
        },{
          where:{id:req.params.aId}
        })
        .then(async asignatura=>{
          var asignaturaAct = asignaturaPrevia[0].dataValues
          const UpdatedInfoAsignatura = await InfoAsignatura.update(infoA, {
            where:{asignaturaId:req.params.aId, mallaId: req.params.mId}
          })
          if (!UpdatedInfoAsignatura) {
            asignatura.update({
              tel_T: asignaturaAct.tel_T,
              tel_E: asignaturaAct.tel_E,
              tel_L: asignaturaAct.tel_L,
              lab_independiente: asignaturaAct.lab_independiente,
            })
            return(res.status(400));
          }
        return res.status(201).send(asignatura)
      })

    })
    .catch(error=> {
      console.log(error);
      return(res.status(400).send(error))
    })
  },
}
