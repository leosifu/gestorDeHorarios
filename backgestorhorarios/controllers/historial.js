const Historial = require('../models').Historial

module.exports = {
  create(req, res){
    console.log(req.body);
    /*return Historial
      .create({
        cupos_pasados: req.body.cupos_pasados,
        tasa_reprobacion: req.body.tasa_reprobacion,
        cupos_estimados: req.body.cupos_estimados,
        tasa_reprobacion_pre: req.tasa_reprobacion_pre.tel_E,
        asignaturaId: req.body.asignaturaId
      })
      .then(historial => res.status(201).send(historial))
      .catch(error=> res.status(400).send(error))*/
  },
  update(req, res){
    return Historial
      .update({
        cupos_pasados: req.body.cupos_pasados,
        tasa_reprobacion: req.body.tasa_reprobacion,
        cupos_estimados: req.body.cupos_estimados,
        tasa_reprobacion_pre: req.tasa_reprobacion_pre.tel_E,
        asignaturaId: req.body.asignaturaId
      },{
        where:{id:req.params.id}
      })
      .then(historial => res.status(201).send(historial))
      .catch(error=> res.status(400).send(error))
  }
}
