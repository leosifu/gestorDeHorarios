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
    Bloque.findOne({
      where:{coordinacionId: req.params.cId}
    })
    .then(bloque=>{
      console.log(bloque);
      var bloq = bloque.dataValues
      console.log(bloq);
      return Bloque
        .update({
          num_asociacion: bloque.num_asociacion
        },{
          where:{coordinacionId:req.params.cId}
        })
        .then(bloque => res.status(201).send(bloque))
        .catch(error=> res.status(400).send(error))
    })

  },
  updateNumBloque(req, res){
    return Bloque
      .update({
        num_bloque: req.body.num_bloque,
        asignado: req.body.asignado
      },{
        where:{id:req.params.id}
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
