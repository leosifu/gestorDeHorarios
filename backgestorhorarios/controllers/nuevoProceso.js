const Malla = require('../models').Malla
const InfoAsignatura = require('../models').InfoAsignatura
const Asignatura = require('../models').Asignatura
const Historial = require('../models').Historial
const Dependencia = require('../models').Dependencia
const InfoCoordinacion = require('../models').InfoCoordinacion
const Coordinacion = require('../models').Coordinacion
const Bloque = require('../models').Bloque

const _ = require('lodash');

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
    // console.log(MallasDataValues);
    const MallasData = MallasDataValues.map(malla=>({
      año: req.body.año,
      semestre: req.body.semestre,
      res_malla: malla.res_malla,
      nombre_malla: malla.nombre_malla,
      fecha_resolucion: malla.fecha_resolucion,
      n_niveles: malla.n_niveles,
      carreraId: malla.carreraId
    }))
    // console.log(MallasData);
    const NuevasMallas = await Malla.bulkCreate(MallasData)
    const NuevasMallasData = NuevasMallas.map(malla=>malla.dataValues)
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
    // console.log(Asignaturas);
    const NuevasAsignaturas = await Asignatura.bulkCreate(AsignaturasData)
    const NuevasAsignaturasData = NuevasAsignaturas.map(nuevaAsignatura=>nuevaAsignatura.dataValues)
    // console.log(NuevasAsignaturasData);

    //Crear Historial
    const Historiales = Asignaturas.map(asignatura=>asignatura.historial.dataValues)
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
    const NuevosHistoriales = await Historial.bulkCreate(HistorialesData)
    const NuevosHistorialesData = NuevosHistoriales.map(historial=>historial.dataValues)

    //Crear Requisitos
    const RequisitosByMalla = Asignaturas.map(asignatura=>asignatura.requisitos.map(requisito=>
      requisito.dataValues))
    const Requisitos = [].concat(...RequisitosByMalla);
    const Dependencias = Requisitos.map(requisito=>requisito.Dependencia.dataValues)
    const DependenciasData = Dependencias.map(dependencia=>{
      let asignaturaId = dependencia.asignaturaId
      let asignaturaFind = Asignaturas.find(asignatura=>asignatura.id === asignaturaId)
      let asignaturaIndex = Asignaturas.indexOf(asignaturaFind)
      let newAsignatura = NuevasAsignaturasData[asignaturaIndex]
      let newAsignaturaId = newAsignatura.id

      let requisitoId = dependencia.requisitoId
      let requisitoFind = Asignaturas.find(asignatura=>asignatura.id === requisitoId)
      let requisitoIndex = Asignaturas.indexOf(requisitoFind)
      let newRequisito = NuevasAsignaturasData[requisitoIndex]
      let newRequisitoId = newRequisito .id

      return({
        asignaturaId: newAsignaturaId,
        requisitoId: newRequisitoId
      })
    })
    console.log(DependenciasData);
    const DependenciasDataFiltered = _.uniqWith(DependenciasData, _.isEqual);
    console.log('dependencia', DependenciasDataFiltered);
    const NuevosRequisitos = await Dependencia.bulkCreate(DependenciasDataFiltered)
    console.log(NuevosRequisitos);
    const NuevosRequisitosData = NuevosRequisitos.map(requisito=>requisito.dataValues)

    //Crear InfoAsignaturas
    console.log('------------------------Asignaturas--------------------------');
    console.log(Asignaturas);
    const InfoAsignaturas = Asignaturas.map(asignatura=>asignatura.InfoAsignatura.dataValues)
    console.log('------------------------InfoAsignaturas--------------------------');
    console.log(InfoAsignaturas);
    const InfoAsignaturasData = InfoAsignaturas.map(infoA=>{
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
        nombre_asignatura: infoA.nombre_asignatura,
        infoA_id: nuevaMallaId + '~' + infoA.cod_asignatura + '~' + infoA.nombre_asignatura
      })
    })
    console.log('------------------------Asignaturas--------------------------');
    console.log(Asignaturas);
    console.log('------------------------InfoAsignaturasDataS--------------------------');
    console.log(InfoAsignaturasData);
    const InfoAsignaturasDataFiltered = _.uniqWith(InfoAsignaturasData, _.isEqual);
    console.log('------------------------InfoAsignaturasDataFiltered--------------------------');
    console.log(InfoAsignaturasDataFiltered);
    for (var i = 0; i < InfoAsignaturasDataFiltered.length; i++) {
      const newInfoAsignatura = await InfoAsignatura.create(InfoAsignaturasDataFiltered[i])
      console.log(newInfoAsignatura);
    }
    // const NuevasInfoAsignaturas = await InfoAsignatura.bulkCreate(InfoAsignaturasDataFiltered)
    // const NuevasInfoAsignaturasData = NuevasInfoAsignaturas.map(infoA=>infoA.dataValues)
    console.log('------------------------NuevasInfoAsignaturasData--------------------------');

    //Crear Coordinaciones
    const CoordinacionesByAsignatura = Asignaturas.map(asignatura=>asignatura.coordinaciones.map(coordinacion=>
      coordinacion.dataValues))
    const Coordinaciones = [...new Set([].concat(...CoordinacionesByAsignatura))]
    const Coords = Array.from(new Set(Coordinaciones.map(coordinacion=>coordinacion.id)))
    .map(id=>{
      let coord = Coordinaciones.find(coordinacion=>coordinacion.id === id)
      return{
        id: id,
        tipo_coord: coord.tipo_coord,
        infoCoordinacion: coord.InfoCoordinacion.dataValues,
        bloques: coord.bloques.map(bloque=>bloque.dataValues),
        infoCoordinacion: coord.InfoCoordinacion.dataValues
      }
    })
    const CoordinacionData = Coords.map(coordinacion=>({
      tipo_coord: coordinacion.tipo_coord,
    }))
    console.log('------------------------Coordinacion--------------------------');
    const NuevasCoordinaciones = await Coordinacion.bulkCreate(CoordinacionData)
    const NuevasCoordinacionesData = NuevasCoordinaciones.map(coordinacion=>coordinacion.dataValues)

    //Crear InfoCoordinaciones
    const InfoCoordinaciones = Coords.map(coordinacion=>coordinacion.infoCoordinacion)
    const InfoCoordinacionesData = InfoCoordinaciones.map(infoC=>{
      let asignaturaId = infoC.asignaturaId
      let asignaturaFind = Asignaturas.find(asignatura=>asignatura.id === asignaturaId)
      let asignaturaIndex = Asignaturas.indexOf(asignaturaFind)
      let newAsignatura = NuevasAsignaturasData[asignaturaIndex]
      let newAsignaturaId = newAsignatura.id

      let coordinacionId = infoC.coordinacionId
      let coordinacionFind = Coords.find(coordinacion=>coordinacion.id === coordinacionId)
      let coordinacionIndex = Coords.indexOf(coordinacionFind)
      let newCoordinacion = NuevasCoordinacionesData[coordinacionIndex]
      let nuevaCoordinacionId = newCoordinacion.id
      return ({
        asignaturaId: newAsignaturaId,
        coordinacionId: nuevaCoordinacionId,
        cod_coord: infoC.cod_coord,
        nombre_coord: infoC.nombre_coord,
        infoC_id: newAsignaturaId + '~' + infoC.cod_coord + '~' + infoC.nombre_coord
      })
    })
    console.log('------------------------NuevasInfoCoordinacionesData--------------------------');
    const NuevasInfoCoordinacion = await InfoCoordinacion.bulkCreate(InfoCoordinacionesData)
    const NuevasInfoCoordinacionesData = NuevasInfoCoordinacion.map(infoC=>infoC.dataValues)
    console.log(NuevasInfoCoordinacionesData);

    //Crear Bloques
    const Bloques = Coords.map(coordinacion=>coordinacion.bloques)
    const AllBloques = [].concat(...Bloques);
    const BloquesData = AllBloques.map(bloque=>{
      let coordinacionId = bloque.coordinacionId
      let coordinacionFind = Coords.find(coordinacion=>coordinacion.id === coordinacionId)
      let coordinacionIndex = Coords.indexOf(coordinacionFind)
      let newCoordinacion = NuevasCoordinacionesData[coordinacionIndex]
      let newCoordinacionId = newCoordinacion.id
      return({
        num_bloque: bloque.num_bloque,
        sala: bloque.sala,
        asignado: bloque.asignado,
        coordinacionId: newCoordinacionId,
      })
    })
    const NuevosBloques = await Bloque.bulkCreate(BloquesData)
    const nuevoBloqueData = NuevosBloques.map(bloque=>bloque.dataValues)
    console.log('------------------------nuevoBloqueData--------------------------');
    console.log(nuevoBloqueData);

    res.send(NuevasMallas)
  }
}
