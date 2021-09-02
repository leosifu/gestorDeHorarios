const Historial = require('../models').Historial
const Asignatura = require('../models').Asignatura
const AsignaturaC = require('./asignatura')

function actualizarCupos(id, cupos_pasados, tasa_reprobacion, desinscripciones){
  Asignatura.findOne({
    where:{id:id},
    include: [{model:Asignatura, as:'requisitos', include:[{model: Historial, as: 'historial'}]},
      {model: Asignatura, as:'asignaturas', include:[{model: Historial, as: 'historial'}]
    }]
  })
  .then(asignatura => {
    //console.log('\n');
    //console.log(asignatura.dataValues.requisitos);
    var requisitos = asignatura.dataValues.requisitos
    var estimados = Math.ceil(parseInt(desinscripciones) + (parseInt(cupos_pasados) - parseInt(desinscripciones)) * parseInt(tasa_reprobacion)/100);
    for (var i = 0; i < requisitos.length; i++) {
      var requisito = requisitos[i].dataValues;
      var historial = requisito.historial.dataValues;
      estimados = estimados + Math.ceil(( parseInt(historial.cupos_pasados) - parseInt(historial.desinscripciones))*
        (100 - parseInt(historial.tasa_reprobacion))/100);
    }
    var asignaturas = asignatura.dataValues.asignaturas;
    Historial.update({
      cupos_estimados: estimados
    },{
      where: {
        asignaturaId: id
      }
    })
    .then(historial => {
      for (var i = 0; i < asignaturas.length; i++) {
        var asignatura = asignaturas[i].dataValues
        var historial = asignatura.historial.dataValues
        actualizarCupos(asignatura.id, historial.cupos_pasados, historial.tasa_reprobacion,
          historial.desinscripciones)
      }
    })
    //console.log('\n');
    //console.log(asignatura.dataValues.asignaturas);
  })
  .catch(error=> {
    console.log(error);
    return(res.status(400).send(error))
  })
}

function updateHistorial(req, res){
  return Historial
    .update({
      cupos_pasados: req.body.cupos_pasados,
      tasa_reprobacion: req.body.tasa_reprobacion,
      desinscripciones: req.body.desinscripciones
    },{
        where:{asignaturaId:req.params.id}
  })
  .then(historial=>{
    actualizarCupos(req.params.id, req.body.cupos_pasados, req.body.tasa_reprobacion,
      req.body.desinscripciones)
    return (res.json(historial))
  })
  .catch(error=> {
    console.log(error);
    return(res.status(400).send(error))
  })
}

module.exports = {
  create(req, res){
    var cupos_estimados = req.historial.cupos_pasados*req.historial.tasa_reprobacion/100
    return Historial
      .create({
        cupos_pasados: req.historial.cupos_pasados,
        tasa_reprobacion: req.historial.tasa_reprobacion,
        cupos_estimados: cupos_estimados,
        desinscripciones: req.historial.desinscripciones,
        asignaturaId: req.asignaturaId
      })
      .then(historial => {
        return historial
      })
      .catch(error=> res.status(400).send(error))
  },
  findAll(req, res){
    return Historial
      .findAll({
      })
      .then(historial =>res.json(historial))
      .catch(error=> res.status(400).send(error))
  },
  findHistorial(id){
    return Historial
      .findOne({
        where:{asignaturaId:id}
      })
      .then(historial=>{
        actualizarCupos(id, historial.dataValues.cupos_pasados,
          historial.dataValues.tasa_reprobacion, historial.dataValues.desinscripciones)
      })
  },
  updateHistorial,
  actualizarCupos,

}
