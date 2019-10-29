const Dependencia = require('../models').Dependencia

module.exports = {
  crearDependencia(req, res){
    return Dependencia
      .create({
        requisitoId: req.body.requisitoId,
        asignaturaId: req.body.asignaturaId
      })
      .then(dependencia => {
        console.log(dependencia)
        return res.json(dependencia)
      })
      .catch(error=> {
        console.log(error);
      })
  },
  removeDependencia(req, res){
    console.log(req.query);
    Dependencia.findOne({
      where: {
        requisitoId: req.query.requisitoId,
        asignaturaId: req.query.asignaturaId
      }
    })
    .then(dependencia=>{
      dependencia.destroy()
      res.json(dependencia)
    }
    )
  }
}
