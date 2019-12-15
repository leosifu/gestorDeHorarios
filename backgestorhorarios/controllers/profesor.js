const Profesor = require('../models').Profesor

module.exports = {
  create(req, res){
    console.log(req);
    return Profesor
      .bulkCreate(req)
      .then(profesores=>{
        console.log(profesores);
      })
      .catch(error=>console.log(error))
  }
}
