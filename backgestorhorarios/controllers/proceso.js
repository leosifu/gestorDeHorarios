const Proceso = require('../models').Proceso

module.exports = {
  findAll(req,res){
    return Proceso
      .findAll({})
      .then(proceso =>res.json(proceso))
      .catch(error=> {
        console.log(error);
        return(res.status(400).send(error))
      })
  },
}
