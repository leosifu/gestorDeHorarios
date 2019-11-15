const Coordinacion = require('../models').Coordinacion
const Bloque = require('../models').Bloque

module.exports = {
  create(req, res){
    return Bloque
      .bulkCreate(
        req
      )
      .then(bloques => {
        console.log(bloques);
        return bloques
      })
      .catch(error=> res.status(400).send(error))
  },
  setAsociacion(req, res){
    return Bloque
      .update({
        num_asociacion: req.body.num_asociacion
      },{
        where:{coordinacionId:req.params.cId}
      })
      .then(bloque => res.status(201).send(bloque))
      .catch(error=> res.status(400).send(error))
  },
  updateNumBloque(req, res){
    return Bloque
      .update({
        num_bloque: req.body.num_bloque,
        asignado: req.body.asignado
      },{
        where:{num_asociacion:req.params.numA, num_orden_bloque: req.params.numB}
      })
      .then(bloque => res.status(201).send(bloque))
  },
  deleteBloque(req, res){
    console.log(req);
    Bloque.findOne({
      where: {
        id: req,
      }
    })
    .then(bloque=>{
      bloque.destroy()

    })
    .catch(error=> res.status(400).send(error))
  }
}
