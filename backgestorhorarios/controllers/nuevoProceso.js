const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura
const Historial = require('../models').Historial
const Coordinacion = require('../models').Coordinacion
const Bloque = require('../models').Bloque
const InfoAsignatura = require('../models').InfoAsignatura

module.exports = {
  async createProceso(req, res){
    const Mallas = await Malla.findAll({
      where: {activa: true},
      include: [{model: Asignatura, as: 'asignaturas',
        include: [{model:Asignatura, as:'requisitos'},
          {model:Coordinacion, as:'coordinaciones', include:[{model: Bloque, as:'bloques'}]},
          {model:Historial, as:'historial'}]
      }]
    })
    const MallasDataValues = Mallas.map(malla=>malla.dataValues)
    console.log(MallasDataValues);
    const MallasData = MallasDataValues.map(malla=>({
      año: req.body.año,
      semestre: req.body.semestre,
      res_malla: malla.res_malla,
      nombre_malla: malla.nombre_malla,
      fecha_resolucion: malla.fecha_resolucion,
      n_niveles: malla.n_niveles,
      carreraId: malla.carreraId
    }))
    console.log(MallasData);
    const NuevasMallas = await Malla.bulkCreate(MallasData)
    const NuevasMallasData = NuevasMallas.map(malla=>malla.dataValues)
    console.log(NuevasMallasData);
    const AsignaturasByMalla = Mallas.map(malla=>malla.dataValues.asignaturas.map(asignatura=>
      asignatura.dataValues))

    //Cear Asignaturas
    const Asignaturas = [].concat(...AsignaturasByMalla);
    const AsignaturasData = Asignaturas.map(asignatura=>({
      tel_T: asignatura.tel_T,
      tel_E: asignatura.tel_E,
      tel_L: asignatura.tel_L,
      lab_independiente: asignatura.lab_independiente
    }))
    console.log(Asignaturas);
    const NuevasAsignaturas = await Asignatura.bulkCreate(AsignaturasData)
    const NuevasAsignaturasData = NuevasAsignaturas.map(nuevaAsignatura=>nuevaAsignatura.dataValues)
    console.log(NuevasAsignaturasData);

    //Crear Historial
    const Historiales = Asignaturas.map(asignatura=>asignatura.historial.dataValues)
    console.log(Historiales);
    const HistorialesData = Historiales.map(historial=>{
      let asignaturaId = historial.asignaturaId
      let asignaturaFind = Asignaturas.find(asignatura=>asignatura.id === asignaturaId)
      let asignaturaIndex = Asignaturas.indexOf(asignaturaFind)
      let newAsignatura = NuevasAsignaturasData[asignaturaIndex]
      let newAsignaturaId = newAsignatura.id
      return({
        cupos_pasados: historial.cupos_pasados,
        tasa_reprobacion: historial.tasa_reprobacion,
        tasa_reprobacion_pre: historial.tasa_reprobacion_pre,
        asignaturaId: newAsignaturaId
      })
    })
    console.log(HistorialesData);
    const NuevosHistoriales = await Historial.bulkCreate(HistorialesData)
    const NuevosHistorialesData = NuevosHistoriales.map(historial=>historial.dataValues)

    //Crear InfoAsignaturas
    const InfoAsignaturas = Asignaturas.map(asignatura=>asignatura.InfoAsignatura.dataValues)
    const InfoAsignaturasData = InfoAsignaturas.map((infoA, n)=>{
      let mallaId = infoA.mallaId
      let mallaFind = MallasDataValues.find(malla=>malla.id === mallaId)
      let mallaIndex = MallasDataValues.indexOf(mallaFind)
      let newMalla = NuevasMallasData[mallaIndex]
      let nuevaMallaId = newMalla.id

      let asignaturaId = infoA.asignaturaId
      let asignaturaFind = Asignaturas.find(asignatura=>asignatura.id === asignaturaId)
      let asignaturaIndex = Asignaturas.indexOf(asignaturaFind)
      let newAsignatura = NuevasAsignaturasData[asignaturaIndex]
      let newAsignaturaId = newAsignatura.id
      return ({
        mallaId: nuevaMallaId,
        asignaturaId: newAsignaturaId,
        cod_asignatura: infoA.cod_asignatura,
        nivel: infoA.nivel,
        nombre_asignatura: infoA.nombre_asignatura
      })
    })
    const NuevasInfoAsignaturas = await InfoAsignatura.bulkCreate(InfoAsignaturasData)
    const NuevasInfoAsignaturasData = NuevasInfoAsignaturas.map(infoA=>infoA.dataValues)
    console.log(NuevasInfoAsignaturasData);

  }
}
