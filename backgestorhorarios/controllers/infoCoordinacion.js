const InfoCoordinacion = require('../models').InfoCoordinacion
const Coordinacion = require('../models').Coordinacion
const Bloques = require('../models').Bloque
//const Coordinacion = require('./coordinacion')
const Bloque = require('./bloque')

module.exports = {
  create(req, res){
    const infoC_id = req.body.asignaturaId + '~' + req.body.cod_coord + '~' + req.body.nombre_coord
    return InfoCoordinacion
    .create({
      asignaturaId: req.body.asignaturaId,
      coordinacionId: req.body.coordinacionId,
      nombre_coord: req.body.nombre_coord,
      cod_coord: req.body.cod_coord,
      infoC_id: infoC_id
    })
    .then(infoC=>{
      if (res) {
        res.status(201).send(infoC)
      }
      else {
        return infoC
      }
    })
    .catch(error => {
      console.log('------------FALLOOOOOOOOOOOOO------------');
      console.log(error);
    })
  },
  actualizarTel(req, res){
    var where = {}
    where.asignaturaId = req.asignaturaId
    var reqAlt = req
    var tel = req.tel
    return InfoCoordinacion
      .findAll({
        where: where,
        include:[{model: Coordinacion, as:'Coordinacion', include:[{model: Bloques, as: 'bloques'}] }]
      })
      .then(asigC=>{
        asigC.map(asiC=>{console.log(asiC.Coordinacion)})
        var coordsTipo = []
        if (reqAlt.tipo != '') {
           var coordsTipoAlt = asigC.filter(asiC=>asiC.Coordinacion.dataValues.tipo_coord == reqAlt.tipo)
           coordsTipo = coordsTipoAlt.map(asiC=>asiC.Coordinacion.dataValues)
        }
        else {
          coordsTipo = asigC.map(asiC=>asiC.Coordinacion.dataValues)
        }
        for (var j = 0; j < coordsTipo.length; j++) {
          var coord = coordsTipo[j]
          var bloques = coord.bloques
          var numBloques = bloques.length
          if (numBloques>tel/2) {
            var i = tel/2
            while (i<numBloques){
              Bloque.deleteBloque(bloques[i].dataValues.id)
              i = i+1
            }
          }
          else {
            var i = numBloques
            var bloquesN = []
            while (i < tel/2){
              bloquesN.push({coordinacionId: coord.id})
              i = i+1
            }
            Bloque.create(bloquesN)
          }
        }
      })
  },
  findCoords(req, res){
    return InfoCoordinacion
      .findAll({
        where: {asignaturaId: req.params.id},
        include:[{model: Coordinacion, as:'Coordinacion'}]
      })
      .then(infoC=>res.status(201).send(infoC)
      )
  },
  async deleteCoordinacionFromAsignatura(req, res){
    try {
      const {coordinacionId, asignaturaId} = req.params;
      const infoCoordinacionDelete = await InfoCoordinacion.findOne({
        where: {
          coordinacionId: coordinacionId,
          asignaturaId: asignaturaId
        }
      });
      await infoCoordinacionDelete.destroy();
      return res.status(201).send({message: 'Coordinación eliminada.'});
    } catch (e) {
      console.log(e);
      return res.status(400).send({message: 'Hubo un error al eliminar la coordinación.'})
    }
  }
}
