const InfoAsignatura = require('../models').InfoAsignatura
const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura
const Coordinacion = require('../models').Coordinacion
const Bloque = require('../models').Bloque
const HistorialM = require('../models').Historial
const Usuario = require('../models').Usuario
const NewCarrera = require('../models').NewCarrera
//const AsignaturaC = require('./asignatura')

module.exports = {
  createInfoAsignatura(req, res){
    const infoA_id = req.body.carreraId + '~' + req.body.cod_asignatura + '~' + req.body.nombre_asignatura;
    console.log(infoA_id);
    console.log(req.body);
    return InfoAsignatura
      .create({
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        carreraId: req.body.carreraId,
        asignaturaId: req.body.asignaturaId,
        nivel: req.body.nivel,
        infoA_id: infoA_id,
      })
      .then(infoA => {
          return res.status(201).send(infoA)
      })
      .catch(error=> {
        console.log(error);
        return res.status(400).send(error)
      })
  },
  async findAsignaturasByNivel(req, res){
    try {
      const {carreraId, nivel, procesoId} = req.params;
      const mallaA = await InfoAsignatura.findAll({
        where: {carreraId: carreraId, nivel: nivel},
        include:[{model:Asignatura, as:'Asignatura',
          include: [{model:Coordinacion, as:'coordinaciones',
            include:[{model: Bloque, as:'bloques'}, {model: Usuario, as: 'profesores'}]}]
        }]
      })
      var asignaturas = mallaA.map(malA=>{
        malA.Asignatura.dataValues.cod_asignatura = malA.cod_asignatura
        malA.Asignatura.dataValues.nombre_asignatura = malA.nombre_asignatura
        return malA.Asignatura
      })
      return(res.json(asignaturas))
    } catch (error) {
      console.log(error);
      return res.status(400).send(error)
    }
  },
  async findAsignatura(req, res){
    try {
      const {carreraId, aId, } = req.params;
      const infoA = await InfoAsignatura
      .findOne({
        where:{carreraId: carreraId, asignaturaId: aId},
        include: [{model:Asignatura, as:'Asignatura',
          include:[{model:HistorialM, as:'historial'},{model:Asignatura, as:'requisitos',
            include:[{model: NewCarrera, as:'carreras', where:{id: carreraId}}]},
            {model:Coordinacion, as:'coordinaciones', include:[{model: Usuario, as: 'profesores'}]
          }]
        }]
      });
      for (var i = 0; i < infoA.dataValues.Asignatura.dataValues.requisitos.length; i++) {
        var requisitos = infoA.dataValues.Asignatura.dataValues.requisitos[i];
        var cod_asignatura = requisitos.carreras[0].InfoAsignatura.dataValues.cod_asignatura
        var nombre_asignatura = requisitos.carreras[0].InfoAsignatura.dataValues.nombre_asignatura
        infoA.dataValues.Asignatura.dataValues.requisitos[i].dataValues
          .cod_asignatura = cod_asignatura
        infoA.dataValues.Asignatura.dataValues.requisitos[i].dataValues
          .nombre_asignatura = nombre_asignatura
      }
      return(res.json(infoA))
    } catch (e) {
      console.log(e);
      return res.status(400).send(e)
    }
    // return InfoAsignatura
    //   .findOne({
    //     where:{mallaId: req.params.mallaId, asignaturaId: req.params.aId},
    //     include: [{model:Asignatura, as:'Asignatura',
    //       include:[{model:HistorialM, as:'historial'},{model:Asignatura, as:'requisitos',
    //         include:[{model: Malla, as:'mallas', where:{id: req.params.mallaId}}]},
    //         {model:Coordinacion, as:'coordinaciones', include:[{model: Usuario, as: 'profesores'}]
    //       }]
    //     }]
    //   })
    //   .then(infoA=>{
    //     for (var i = 0; i < infoA.dataValues.Asignatura.dataValues.requisitos.length; i++) {
    //       var req = infoA.dataValues.Asignatura.dataValues.requisitos[i]
    //       var cod_asignatura = req.mallas[0].InfoAsignatura.dataValues.cod_asignatura
    //       var nombre_asignatura = req.mallas[0].InfoAsignatura.dataValues.nombre_asignatura
    //       infoA.dataValues.Asignatura.dataValues.requisitos[i].dataValues
    //         .cod_asignatura = cod_asignatura
    //       infoA.dataValues.Asignatura.dataValues.requisitos[i].dataValues
    //         .nombre_asignatura = nombre_asignatura
    //     }
    //     return(res.json(infoA))
    //   })
    //   .catch(error=> {
    //     console.log(error);
    //     return res.status(400).send(error)
    //   })
  },
  async findAsignaturas(req,res){
    try {
      const {carreraId} = req.params;
      const asignaturas = await InfoAsignatura
      .findAll({
        where:{carreraId: carreraId},
      });
      return res.status(201).send(asignaturas);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
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
  },
  async deleteAsignaturaFromMalla(req, res){
    try {
      const {mallaId, asignaturaId} = req.params;
      const infoAsignaturaDelete = await InfoAsignatura.findOne({
        where: {
          mallaId: mallaId,
          asignaturaId: asignaturaId
        }
      });
      await infoAsignaturaDelete.destroy();
      return res.status(201).send({message: 'Asignatura eliminada.'});
    } catch (e) {
      console.log(e);
      return res.status(400).send({message: 'Hubo un error al eliminar la asignatura.'})
    }
  }
}
