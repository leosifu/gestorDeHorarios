const Dependecia = require('../models').Dependecia
const Asignatura = require('../models').Asignatura

module.exports = {
  create(req,res){
    console.log("\nProbando dependencias");
    console.log(req.dependencias);
    console.log("\n");
    return Dependecia
      .bulkCreate(
        req
      )
      .then(dependecia => {console.log(dependecia)
        return dependecia})
      .catch(error=> {
        console.log(error);
      })
  },
}
