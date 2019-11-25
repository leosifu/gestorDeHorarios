const Historial = require('../models').Historial
const Asignatura = require('../models').Asignatura
const AsignaturaC = require('./asignatura')

function actualizarCupos(id, cupos_pasados, tasa_reprobacion){
  Asignatura.findOne({
    where:{id:id},
    include: [{model:Asignatura, as:'requisitos', include:[{model: Historial, as: 'historial'}]},
      {model: Asignatura, as:'asignaturas', include:[{model: Historial, as: 'historial'}]
    }]
  })
  .then(asignatura=>{
    //console.log('\n');
    //console.log(asignatura.dataValues.requisitos);
    var requisitos = asignatura.dataValues.requisitos
    var estimados = Math.ceil(cupos_pasados*tasa_reprobacion/100)
    for (var i = 0; i < requisitos.length; i++) {
      var requisito = requisitos[i].dataValues
      //console.log('\n');
      //console.log(requisito);
      var historial = requisito.historial.dataValues
      //console.log('Historial: \n');
      estimados = estimados + Math.ceil(historial.cupos_pasados*(100-historial.tasa_reprobacion)/100)
    }
    var asignaturas = asignatura.dataValues.asignaturas
    Historial.update({
      cupos_estimados: estimados
    },{
      where:{asignaturaId:id}
    })
    .then(historial=>{
      for (var i = 0; i < asignaturas.length; i++) {
        var asignatura = asignaturas[i].dataValues
        var historial = asignatura.historial.dataValues
        actualizarCupos(asignatura.id, historial.cupos_pasados, historial.tasa_reprobacion)
      }
    })
    //console.log('\n');
    //console.log(asignatura.dataValues.asignaturas);
  })
}

function update(req, res){
  return Historial
    .update({
      cupos_pasados: req.body.cupos_pasados,
      tasa_reprobacion: req.body.tasa_reprobacion,
    },{
        where:{asignaturaId:req.params.id}
  })
  .then(historial=>{
    actualizarCupos(req.params.id, req.body.cupos_pasados, req.body.tasa_reprobacion)
    return (res.json(historial))
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
        tasa_reprobacion_pre: req.historial.tasa_reprobacion_pre,
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
          historial.dataValues.tasa_reprobacion)
      })
  },
  update,
  actualizarCupos,

}
