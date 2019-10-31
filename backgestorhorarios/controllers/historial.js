const Historial = require('../models').Historial

module.exports = {
  create(req, res){
    console.log("\n Cuerpo de la respuesta");
    console.log(req.historial);
    console.log("\n Fin cuerpo");
    var cupos_estimados = req.historial.cupos_pasados*req.historial.tasa_reprobacion/100
    console.log("cupos_estimados " + cupos_estimados);
    return Historial
      .create({
        cupos_pasados: req.historial.cupos_pasados,
        tasa_reprobacion: req.historial.tasa_reprobacion,
        cupos_estimados: cupos_estimados,
        tasa_reprobacion_pre: req.historial.tasa_reprobacion_pre,
        asignaturaId: req.asignaturaId
      })
      .then(historial => {
        console.log(historial);
        return historial
      })
      .catch(error=> res.status(400).send(error))
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
  },
  findAll(req, res){
    return Historial
      .findAll({
      })
      .then(historial =>res.json(historial))
      .catch(error=> res.status(400).send(error))
  }
}
