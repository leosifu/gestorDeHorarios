const Asignatura = require('../models').Asignatura
const Malla = require('../models').Malla
const Coordinacion = require('../models').Coordinacion
const HistorialM = require('../models').Historial
const Bloque = require('../models').Bloque
const InfoAsignatura = require('../models').InfoAsignatura
const Historial = require('./historial')
const CoordinacionF = require('./coordinacion')
const AsignCoord = require('./asignCoord')
const InfoAsignaturaC = require('./infoAsignatura')

module.exports = {
  create(req,res){
    console.log(req);
    return Asignatura
      .create({
        tel_T: req.body.tel_T,
        tel_E: req.body.tel_E,
        tel_L: req.body.tel_L,
        lab_independiente: req.body.lab_independiente
      })
      .then(asignatura => {
        console.log(asignatura);
        var data = {
          body:{
            cod_asignatura: req.body.cod_asignatura,
            nombre_asignatura: req.body.nombre_asignatura,
            mallaId: req.body.mallaId,
            asignaturaId: asignatura.dataValues.id,
            nivel: req.body.nivel,
          }
        }
        console.log(data);
        InfoAsignaturaC.create(data)
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
  findAsignatura(req, res){
    var id = req.params.id
    return Asignatura
      .findAll({
        where: {id:id},
        include: [{model:Asignatura, as:'requisitos'},
          {model:Coordinacion, as:'coordinaciones', include:[{model: Bloque, as:'bloques'}]},
          {model:HistorialM, as:'historial'}]
      })
      .then(asignatura =>{
        console.log(asignatura);
        return(res.json(asignatura))
      })
  },
  getRequisitos(req, res){
    var id = req.params.id
    return Asignatura
      .findAll({
        where: {id:id},
        include: [{model:Asignatura, as:'requisitos'}]
      })
      .then(asignatura =>{
        return(res.json(asignatura))
      })
  },
  findAsignaturasByNivel(req, res){
    var id = req.params.id
    var nivel = req.params.nivel
    return Asignatura
      .findAll({
        where: {mallaId:id, nivel: nivel},
        include: [{model:Coordinacion, as:'coordinaciones', include:[{model: Bloque, as:'bloques'}]}]
      })
      .then(asignatura =>{
        console.log(asignatura);
        return(res.json(asignatura))
      })
  },
  update(req, res){
    console.log(req.body);
    var tel_T = parseInt(req.body.tel_T)
    var tel_E = parseInt(req.body.tel_E)
    var tel_L = parseInt(req.body.tel_L)
    Asignatura.findAll({where: {id: req.params.id}})
    .then(asignaturaPrevia => {
      return Asignatura
        .update({
          cod_asignatura: req.body.cod_asignatura,
          nombre_asignatura: req.body.nombre_asignatura,
          tel_T: req.body.tel_T,
          tel_E: req.body.tel_E,
          tel_L: req.body.tel_L,
          lab_independiente: req.body.lab_independiente,
        },{
          where:{id:req.params.id}
        })
        .then(asignatura=>{
          var asignaturaAct = asignaturaPrevia[0].dataValues
          var telTotalAct = tel_T + tel_E + tel_L
          var telTotalPrev = asignaturaAct.tel_T + asignaturaAct.tel_E + asignaturaAct.tel_L
          var telAct = [tel_T, tel_E, tel_L]
          var telAnt = [asignaturaAct.tel_T, asignaturaAct.tel_E, asignaturaAct.tel_L]
          //Copia3 papu
          var iguales = telAnt.length === telAct.length && telAnt.every(function(value, index)
            { return value === telAct[index]});
          var lab_independiente = (req.body.lab_independiente === 'true')
          var labIgual = asignaturaAct.lab_independiente===req.body.lab_independiente
          console.log(labIgual);
          console.log(iguales);
          if (iguales && labIgual) {
            console.log('no hubo cambios en tel ni lab_independiente');
            return res.status(201).send(asignatura)
          }
          if (req.lab_independiente!==asignaturaAct.lab_independiente) {
            console.log('asd');
          }
          console.log('varia tel o lab_independiente');
          if (req.body.lab_independiente) {
            //Se separa el lab de la teoría
            //Se recorren todas las coordinaciones, y segun el tipo que sean, se le suman o restan
            //bloques, segun el tel que le corresponda
            console.log('es lab_independiente');
            var reqT = {
              asignaturaId: asignaturaAct.id,
              tipo: '',
              tel: 0,
              telAnt: 0,
            }
            if(tel_T != asignaturaAct.tel_T || req.body.lab_independiente!=asignaturaAct.lab_independiente){
              reqT.tipo = 'Teoría'
              reqT.tel = tel_T
              reqT.telAnt = asignaturaAct.tel_T
              console.log(reqT);
              AsignCoord.actualizarTel(reqT)
            }
            if (tel_E != asignaturaAct.tel_E|| req.body.lab_independiente!=asignaturaAct.lab_independiente) {
              reqT.tipo = 'Ejercicios'
              reqT.tel = tel_E
              reqT.telAnt = asignaturaAct.tel_E
              console.log(reqT);
              AsignCoord.actualizarTel(reqT)
            }
            if (tel_L != asignaturaAct.tel_L || req.body.lab_independiente!=asignaturaAct.lab_independiente) {
              reqT.tipo = 'Laboratorio'
              reqT.tel = tel_L
              reqT.telAnt = asignaturaAct.tel_L
              console.log('Laboratorio');
              console.log(reqT);
              AsignCoord.actualizarTel(reqT)
            }
          }
          else {
            console.log('no es lab_independiente');
            //Se juntan el lab con la teoría
            var reqT = {
              asignaturaId: asignaturaAct.id,
              tipo: '',
              tel: tel_L + tel_E + tel_T,
              telAnt: asignaturaAct.tel_L + asignaturaAct.tel_E + asignaturaAct.tel_L,
            }
            console.log(reqT);
            AsignCoord.actualizarTel(reqT)
          }
        return res.status(201).send(asignatura)
      })

    })
  }
}
