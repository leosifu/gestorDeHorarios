const AsignCoord = require('../models').AsignCoord
const Coordinacion = require('../models').Coordinacion
const Bloques = require('../models').Bloque
//const Coordinacion = require('./coordinacion')
const Bloque = require('./bloque')

module.exports = {
  create(req, res){
    return AsignCoord
    .create({
      asignaturaId: req.body.asignaturaId,
      coordinacionId: req.body.coordinacionId,
      nombre_coord: req.body.nombre_coord,
      cod_coord: req.body.cod_coord
    })
    .then(asignC=>{
      console.log(asignC);
    })
  },
  actualizarTel(req, res){
    var where = {}
    where.asignaturaId = req.asignaturaId
    var reqAlt = req
    var tel = req.tel
    return AsignCoord
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
              var req = {
                bloqueId: bloques[i].dataValues.id
              }
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
    return AsignCoord
      .findAll({
        where: {asignaturaId: req.params.id},
        include:[{model: Coordinacion, as:'Coordinacion'}]
      })
      .then(asignC=>res.status(201).send(asignC)
      )
  },
}
