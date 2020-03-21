const Asignatura = require('../models').Asignatura
const Malla = require('../models').Malla
const Coordinacion = require('../models').Coordinacion
const HistorialM = require('../models').Historial
const Bloque = require('../models').Bloque
const InfoAsignatura = require('../models').InfoAsignatura
const Historial = require('./historial')
const CoordinacionF = require('./coordinacion')
const InfoCoordinacion = require('./infoCoordinacion')
const InfoAsignaturaC = require('./infoAsignatura')

module.exports = {
  create(req,res){
    return Asignatura
      .create({
        tel_T: req.body.tel_T,
        tel_E: req.body.tel_E,
        tel_L: req.body.tel_L,
        lab_independiente: req.body.lab_independiente
      })
      .then(async(asignatura) => {
        console.log('------------------------Asignaturas--------------------------');
        console.log(asignatura);
        var data = {
          body:{
            cod_asignatura: req.body.cod_asignatura,
            nombre_asignatura: req.body.nombre_asignatura,
            mallaId: req.body.mallaId,
            asignaturaId: asignatura.dataValues.id,
            nivel: req.body.nivel,
            infoA_id: req.body.mallaId + '~' + req.body.cod_asignatura + '~' + req.body.nombre_asignatura
          }
        }
        console.log('------------------------Data--------------------------');
        console.log(data);
        const NewInfoAsignatura = await InfoAsignaturaC.create(data)
        console.log('------------------------NewInfoAsignatura--------------------------');
        console.log(NewInfoAsignatura);
        if (!NewInfoAsignatura) {
          asignatura.destroy()
          return(res.status(400))
        }
        console.log(NewInfoAsignatura);
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
        return(res.json(asignatura))
      })
  },
  update(req, res){

    Asignatura.findAll({where: {id: req.params.aId}})
    .then(asignaturaPrevia => {
      var tel_T = parseInt(req.body.tel_T)
      var tel_E = parseInt(req.body.tel_E)
      var tel_L = parseInt(req.body.tel_L)
      var infoA = {
        asignaturaId: req.params.aId,
        mallaId: req.params.mId,
        cod_asignatura: req.body.cod_asignatura,
        nombre_asignatura: req.body.nombre_asignatura,
        infoA_id: req.params.mId + '~' + req.body.cod_asignatura + '~' + req.body.nombre_asignatura
      }
      return Asignatura
        .update({
          tel_T: req.body.tel_T,
          tel_E: req.body.tel_E,
          tel_L: req.body.tel_L,
          lab_independiente: req.body.lab_independiente,
        },{
          where:{id:req.params.aId}
        })
        .then(async asignatura=>{
          const UpdatedInfoAsignatura = await InfoAsignaturaC.update(infoA)
          if (!UpdatedInfoAsignatura) {
            asignatura.destroy();
            return(res.status(400));
          }
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
          if (iguales && labIgual) {
            return res.status(201).send(asignatura)
          }
          if (req.lab_independiente!==asignaturaAct.lab_independiente) {
          }
          if (req.body.lab_independiente) {
            //Se separa el lab de la teoría
            //Se recorren todas las coordinaciones, y segun el tipo que sean, se le suman o restan
            //bloques, segun el tel que le corresponda
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
              InfoCoordinacion.actualizarTel(reqT)
            }
            if (tel_E != asignaturaAct.tel_E|| req.body.lab_independiente!=asignaturaAct.lab_independiente) {
              reqT.tipo = 'Ejercicios'
              reqT.tel = tel_E
              reqT.telAnt = asignaturaAct.tel_E
              InfoCoordinacion.actualizarTel(reqT)
            }
            if (tel_L != asignaturaAct.tel_L || req.body.lab_independiente!=asignaturaAct.lab_independiente) {
              reqT.tipo = 'Laboratorio'
              reqT.tel = tel_L
              reqT.telAnt = asignaturaAct.tel_L
              InfoCoordinacion.actualizarTel(reqT)
            }
          }
          else {
            //Se juntan el lab con la teoría
            var reqT = {
              asignaturaId: asignaturaAct.id,
              tipo: '',
              tel: tel_L + tel_E + tel_T,
              telAnt: asignaturaAct.tel_L + asignaturaAct.tel_E + asignaturaAct.tel_L,
            }
            InfoCoordinacion.actualizarTel(reqT)
          }
        return res.status(201).send(asignatura)
      })

    })
  }
}
