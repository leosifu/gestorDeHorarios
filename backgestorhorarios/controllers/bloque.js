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
  }
}
