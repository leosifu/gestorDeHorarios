const Profesor = require('../models').Profesor

module.exports = {
  create(req, res){
    console.log(req.body);
    var profesores = req.body.slice(2, req.body.length-1)
    console.log(profesores);
    const CampoProfesor = profesores.map((profesor, n)=>{
      return({
        name: profesor[1],
        rut: profesor[2],
        email: profesor[3],
      })
    })
    console.log('profesoresData', CampoProfesor);
    return Profesor
      .bulkCreate(CampoProfesor)
      .then(profesores=>{
        console.log(profesores);
      })
      .catch(error=>console.log(error))
  }
}
