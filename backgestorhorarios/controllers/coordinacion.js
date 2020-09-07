const { Op } = require("sequelize");

const Coordinacion = require('../models').Coordinacion
const Asignatura = require('../models').Asignatura
const Bloque = require('../models').Bloque
const InfoCoordinacion = require('../models').InfoCoordinacion
const Asignacion = require('../models').Asignacion
const bloqueController = require('./bloque')

module.exports = {
  create(req, res){
    return Coordinacion
      .create({
        tipo_coord: req.body.tipo_coord,
        num_bloques: req.body.num_bloques
      })
      .then(async coordinacion => {
        var data = {
          coordinacionId: coordinacion.dataValues.id,
          cod_coord: req.body.cod_coord,
          nombre_coord: req.body.nombre_coord,
          asignaturaId: req.body.asignaturaId,
          infoC_id: req.body.asignaturaId + '~' + req.body.cod_coord + '~' + req.body.nombre_coord
        }
        const NewInfoCoordinacion = await InfoCoordinacion.create(data)
        if (!NewInfoCoordinacion) {
          coordinacion.destroy();
          return(res.status(400));
        }
        var bloques = []
        for (var i = 0; i < req.body.num_bloques; i++) {
          bloques.push({coordinacionId: coordinacion.dataValues.id})
        }
        const CoordinacionBloques = await Bloque.bulkCreate(bloques);
        const AsignarProfesores = req.body.profesores.map(profesor => ({
          usuarioId: profesor.id,
          coordinacionId: coordinacion.dataValues.id
        }));
        const Asignaciones = await Asignacion.bulkCreate(AsignarProfesores);
        return res.status(201).send(coordinacion)
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send(error)
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
  async updateCoordinacion(req, res){
    try {
      const coordinacionId = req.params.id;
      const {num_bloques, tipo_coord} = req.body;
      console.log(req.body.profesores);
      const profesores = req.body.profesores.map(profesor => profesor.id)
      const FindCoordinacion = await Coordinacion.findOne({
        where: {id: coordinacionId},
        include: [{model: Bloque, as: 'bloques'}]
      });
      let PrevBloques = FindCoordinacion.dataValues.num_bloques;
      const Bloques = FindCoordinacion.dataValues.bloques.map(bloque => bloque.dataValues);
      const UpdatedCoordinacion = await FindCoordinacion.update({
        tipo_coord: tipo_coord,
        num_bloques: num_bloques
      });
      if (!UpdatedCoordinacion) {
        return res.status(400)
      }
      if (num_bloques > PrevBloques) {
        //crear bloques
        let i = PrevBloques;
        let bloquesNuevos = []
        while (i < num_bloques) {
          bloquesNuevos.push({coordinacionId: coordinacionId})
          i = i + 1
        }
        const NuevosBloques = await Bloque.bulkCreate(bloquesNuevos)
      }
      else if (num_bloques < PrevBloques) {
        //borrarBloques
        let i = num_bloques;
        while (i < PrevBloques) {
          await bloqueController.deleteBloque(Bloques[i].id)
          i = i + 1
        }
      }
      let ProfesoresCoordinacion = []
      if (profesores.length === 0) {
        ProfesoresCoordinacion = await Asignacion.findAll({
          where: {
            coordinacionId: coordinacionId,
          }
        });
      }
      else {
        ProfesoresCoordinacion = await Asignacion.findAll({
          where: {
            coordinacionId: coordinacionId,
            [Op.not]: [{
              usuarioId: profesores
            }]
          }
        });
      }
      for (var i = 0; i < ProfesoresCoordinacion.length; i++) {
        const DeleteAsignacion = ProfesoresCoordinacion[i]
        await DeleteAsignacion.destroy();
      }
      const AsignarProfesores = profesores.map(profesor => ({
        usuarioId: profesor,
        coordinacionId: coordinacionId
      }));
      for (var i = 0; i < AsignarProfesores.length; i++) {
        const [NuevoProfesor, created] = await Asignacion.findOrCreate({
          where: AsignarProfesores[i]
        });
      }
      console.log('FIIIIIIIIIN');
      return res.status(201).send(FindCoordinacion)
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  }
}
