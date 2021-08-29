const NewCarrera = require('../models').NewCarrera
const Malla = require('../models').Malla
const Asignatura = require('../models').Asignatura

module.exports = {
  async createCarrera(req, res){
    try {
      const newCarrera = await NewCarrera.create({
        nombre: req.body.nombre,
        jornada: req.body.jornada,
        año: req.body.año,
        n_niveles: req.body.n_niveles,
        procesoId: req.body.procesoId
      });
      return res.status(201).send(newCarrera);
    } catch (e) {
      console.log(e);
      return(res.status(400).send(e));
    }
    // return NewCarrera
    //   .create({
    //     nombre_carrera: req.body.nombre_carrera,
    //     jornada: req.body.jornada,
    //     año: req.body.año,
    //     n_niveles: req.body.n_niveles
    //   })
    //   .then(carrera => res.status(201).send(carrera))
    //   .catch(error=> {
    //     console.log(error);
    //     return(res.status(400).send(error))
    //   })
  },
  async findCarreras(req, res){
    try {
      const newCarreras = await NewCarrera.findAll({});
      return res.status(201).send(newCarreras);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e);
    }
  },
  async findAllCarrerasByProceso(req,res){
    try {
      const {procesoId} = req.params;
      const carreras = await NewCarrera.findAll({
        where: {procesoId: procesoId}, required: false
      });
      return res.status(201).send(carreras);
    } catch (e) {
      console.log(e);
      return res.status(400).send(error);
    }
  },
  findByCarreraId(req, res){
    var id = req.params.id
    return Carrera
      .findAll({
        where: {id:id},
        include: [{model:Malla, as:'mallas'}]
      })
      .then(carrera =>res.json(carrera))
      .catch(error=> res.status(400).send(error))
  },
  async updateCarrera(req,res){
    try {
      const newCarrera = await NewCarrera.update({
        nombre: req.body.nombre,
        jornada: req.body.jornada,
        año: req.body.año,
        n_niveles: req.body.n_niveles,
        procesoId: req.body.procesoId
      },{
        where:{id:req.params.id}
      });
      return res.status(201).send(newCarrera);
    } catch (e) {
      console.log(e);
      return(res.status(400).send(e));
    }
  },
  async deleteCarrera(req, res){
    try {
      const {carreraId} = req.params;
      const carreraDestroy = await Carrera.findOne({
        where: {id: carreraId}
      });
      await carreraDestroy.destroy();
      return res.status(201).send({message: 'Carrera eliminada.'});
    } catch (e) {
      console.log(e);
      return res.status(400).send({message: 'Error al eliminar carrera.'});
    }
  },
  async getAsignaturasByCarrera(req,res){
    try {
      const {carreraId, procesoId} = req.params;
      const carrera = await NewCarrera
      .findOne({
        where: {id:carreraId},
        include: [{
          model:Asignatura,
          as:'asignaturas',
        }]
      });
      const asignaturas = carrera.dataValues.asignaturas
      let niveles = [];
      for (var i = 1; i <= carrera.dataValues.n_niveles; i++) {
        var algo1 = asignaturas.filter(asignatura=>asignatura.InfoAsignatura.dataValues.nivel == i)
        var obj = {"nivel": i, asignaturas: algo1}
        niveles.push(obj)
      }
      carrera.dataValues["niveles"] = niveles
      delete carrera.dataValues.asignaturas
      return (res.json(carrera))
    } catch (error) {
      console.log(error);
      return res.status(400).send(error)
    }
  },
}
