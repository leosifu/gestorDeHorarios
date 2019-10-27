const Asignatura = require('../models').Asignatura
const Malla = require('../models').Malla
const Historial = require('./historial')
const Dependecia = require('./dependencia')

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
        console.log("LLego");
        const dataDependencia = [
          {requisitoId: 1, asignaturaId: asignatura.dataValues.id},
          {requisitoId: 2, asignaturaId: asignatura.dataValues.id},
        ]
        console.log("\ndataDependencia");
        console.log(dataDependencia);
        console.log("\nfin data");
        //Dependecia.create(dataDependencia)
        return(res.status(201).send(asignatura))
      })
      .catch(error=> res.status(400).send(error))
  },
  findAll(req,res){
    return Asignatura
      .findAll({
      }).then(asignatura =>res.json(asignatura))
  },
  getRequisitos(req, res){

  }
}
