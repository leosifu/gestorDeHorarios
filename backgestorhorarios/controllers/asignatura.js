const Asignatura = require('../models').Asignatura
const Malla = require('../models').Malla
const Historial = require('./historial')

module.exports = {
  create(req,res){
    return Asignatura
      .create({
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        tel_T: req.body.tel_T,
        tel_E: req.body.tel_E,
        tel_L: req.body.tel_T,
        nivel: req.body.nivel,
        mallaId: req.body.mallaId
      })
      .then(asignatura => {
        console.log("\nAsignatura: ");
        console.log(asignatura.dataValues);
        console.log("\n Fin asignatura");
        const dataHistorial = {
          historial: req.body.historial,
          asignaturaId: asignatura.dataValues.id
        }
        Historial.create(dataHistorial)
        return(res.status(201).send(asignatura))
      })
      .catch(error=> res.status(400).send(error))
  },
  findAll(req,res){
    return Asignatura
      .findAll({
        //include: [{model:Asignatura, as:'requisitos'}]
      }).then(asignatura =>{
        asignatura.getAsignaturas()
        return (res.json(asignatura))
      })
  },
  findAsignatura(req, res){
    var id = req.params.id
    return Asignatura
      .findAll({
        where: {id:id},
        include: [{model:Asignatura, as:'requisitos'}]
      }).then(asignatura =>{
        return(res.json(asignatura))
      })
  },
}
