const MallaAsign = require('../models').MallaAsign
const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura
const Coordinacion = require('../models').Coordinacion
const Bloque = require('../models').Bloque
//const AsignaturaC = require('./asignatura')

module.exports = {
  create(req, res){
    return MallaAsign
      .create({
        cod_asignatura: req.cod_asignatura,
        mallaId: req.mallaId,
        asignaturaId: req.asignaturaId,
        nivel: req.nivel,
      })
      .then(mallaA=>{

      })
      .catch(error=>{
        console.log('ahhhhh');
      })
  },
  findAsignaturasByNivel(req, res){
    var id = req.params.id
    var nivel = req.params.nivel
    return MallaAsign
      .findAll({
        where: {mallaId:id, nivel: nivel},
        include:[{model:Asignatura, as:'Asignatura',
          include: [{model:Coordinacion, as:'coordinaciones', include:[{model: Bloque, as:'bloques'}]}]
        }]
      })
      .then(mallaA=>{
        console.log(mallaA);
        var asignaturas = mallaA.map(malA=>{
          malA.Asignatura.dataValues.cod_asignatura = malA.cod_asignatura
          return malA.Asignatura
        })
        console.log(asignaturas);
        return(res.json(asignaturas))
      })
  }
}
