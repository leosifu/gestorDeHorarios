const Coordinacion = require('../models').Coordinacion
const Asignatura = require('../models').Asignatura
const Bloques = require('../models').Bloque
const Bloque = require('./bloque')

module.exports = {
  create(req, res){
    console.log(req.body);
    return Coordinacion
      .create({
        cod_coord: req.body.cod_coord,
        tipo_coord: req.body.tipo_coord,
        nombre_coord: req.body.nombre_coord,
        asignaturaId: req.body.asignaturaId
      })
      .then(coordinacion => {
        var bloques = []
        for (var i = 0; i < req.body.num_bloques; i++) {
          bloques.push({coordinacionId: coordinacion.dataValues.id,
            num_orden_bloque: i, num_asociacion: coordinacion.dataValues.id})
        }
        console.log(bloques);
        Bloque.create(bloques)
        return(res.status(201).send(coordinacion))
      })
  },
  updateNum(req, res){
    return Coordinacion
      .update({
        num_asociacion: req.body.num_asociacion
      },{
        where:{id:req.body.ids}
      })
      .then(coordinacion => res.status(201).send(coordinacion))
      .catch(error=> res.status(400).send(error))
  },
  actualizarTel(req){
    var where = {}
    console.log(req);
    where.asignaturaId = req.asignaturaId
    console.log(req);
    if (req.tipo != '') {
      where.tipo_coord = req.tipo
    }
    var tel = req.tel
    Coordinacion
    .findAll({
      where: where,
      include:[{model: Bloques, as:'bloques'}]
    })
    .then(coords=>{
      for (var j = 0; j < coords.length; j++) {
        var coord = coords[j].dataValues
        var bloques = coord.bloques
        var numBloques = bloques.length
        if (numBloques>tel/2) {
          console.log('disminuir bloques');
          var i = tel/2
          console.log(i);
          console.log(numBloques);
          while (i<numBloques){
            var req = {
              bloqueId: bloques[i].dataValues.id
            }
            Bloque.deleteBloque(bloques[i].dataValues.id)
            i = i+1
          }
        }
        else {
          console.log('aumentar bloques');
          var i = numBloques
          var bloquesN = []
          while (i < tel/2){
            console.log(i);
            bloquesN.push({coordinacionId: coords[j].id,
              num_orden_bloque: i, num_asociacion: coords[j].id})
            i = i+1
          }
          Bloque.create(bloquesN)
        }
      }
    })
  }
}
