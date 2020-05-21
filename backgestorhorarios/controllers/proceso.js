const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const Proceso = require('../models').Proceso;
const Usuario = require('../models').Usuario;
const Rol = require('../models').Rol;

module.exports = {
  create(req, res){
    return Proceso
      .create({
        año: req.body.año,
        semestre: req.body.semestre,
        estado: 'creating',
        añoSemestre: req.body.año + '~' + req.body.semestre
      })
      .then(proceso => {
        return(res.status(201).send(proceso));
      })
      .catch(error=> {
        console.log(error);
        return(res.status(400).send(error));
      })
  },
  findAll(req,res){
    let idToken = req.get('Authorization');
    if (idToken) {
      const token = idToken.split(' ');
      jwt.verify(token[1], process.env.KEY, async(err, usuarioData) => {
        if(err){
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
        } else {
          //If token is successfully verified, we can send the autorized data
          console.log(usuarioData);
          const UserRoles = usuarioData.roles;
          if (UserRoles.length === 0) {
            console.log('-------NO HAY USUARIO EN DB--------');
            return Proceso
              .findAll({
                where: {estado: 'active'}
              })
              .then(proceso =>res.status(200).json(proceso))
              .catch(error=> {
                console.log(error);
                return(res.status(400).send(error))
              })
          }
          else {
            const UserRolesNames = UserRoles.map(rol => rol.rol).sort();
            if (UserRolesNames.includes('admin') || UserRolesNames.includes('coordinador')){
              return Proceso
                .findAll({})
                .then(proceso =>{
                  return res.status(200).json(proceso)})
                .catch(error=> {
                  console.log(error);
                  return(res.status(400).send(error))
                })
            }
            else {
              return Proceso
                .findAll({
                  where: {estado: 'creating'}
                })
                .then(proceso =>res.status(200).json(proceso))
                .catch(error=> {
                  console.log(error);
                  return(res.status(400).send(error))
                })
            }
          }
          res.json({
              message: 'Successful log in',
              authorizedData
          });
          console.log('SUCCESS: Connected to protected route');
        }
      })
      // admin.auth().verifyIdToken(token[1]).then(async(claims) => {
      //   // console.log('claims', claims);
      //   if (claims.uid) {
      //     const UsuarioFind = await Usuario.findAll({
      //       where: {
      //         email: claims.email
      //       },
      //       include: [{
      //         model: Rol, as: 'roles'
      //       }]
      //     })
      //     if (UsuarioFind.length === 0) {
      //       console.log('-------NO HAY USUARIO EN DB--------');
      //       return Proceso
      //         .findAll({
      //           where: {estado: 'active'}
      //         })
      //         .then(proceso =>res.status(200).json(proceso))
      //         .catch(error=> {
      //           console.log(error);
      //           return(res.status(400).send(error))
      //         })
      //     }
      //     else {
      //       const UserRoles = UsuarioFind[0].dataValues.roles.map(rol => rol.dataValues);
      //       const UserRolesNames = UserRoles.map(rol => rol.rol).sort();
      //       if (UserRolesNames.includes('admin') || UserRolesNames.includes('coordinador')){
      //         return Proceso
      //           .findAll({})
      //           .then(proceso =>{
      //             return res.status(200).json(proceso)})
      //           .catch(error=> {
      //             console.log(error);
      //             return(res.status(400).send(error))
      //           })
      //       }
      //       else {
      //         return Proceso
      //           .findAll({
      //             where: {estado: 'creating'}
      //           })
      //           .then(proceso =>res.status(200).json(proceso))
      //           .catch(error=> {
      //             console.log(error);
      //             return(res.status(400).send(error))
      //           })
      //       }
      //     }
      //   }
      // })
      // .catch(error => {
      //   console.log(error);
      //   return res.status(401).json({ message: 'Usuario no Autorizado'})
      // });
    }
    else {
      return Proceso
        .findAll({
          where: {estado: 'active'}
        })
        .then(proceso =>res.status(200).json(proceso))
        .catch(error=> {
          console.log(error);
          return(res.status(400).send(error))
        })
    }
  },
  async changeProcesoStatus(req, res){
    try {
      const {estado, año, semestre} = req.body;
      const {procesoId} = req.params;
      const currentProceso = await Proceso.findOne({where: {id: procesoId}});
      const currentProcesoData = currentProceso.dataValues;
      if (estado === 'active') {
        const getProcesosActivos = await Proceso.findAll({where: {estado: 'active'}});
        for (var i = 0; i < getProcesosActivos.length; i++) {
          const ProcesoActivo = getProcesosActivos[i].dataValues;
          const DeactivateProceso = await Proceso.update({
            estado: 'finished'
          },{
            where: {id: ProcesoActivo.id}
          });
        }
        const UpdateProceso = await Proceso.update({
          estado: estado,
        }, {
          where: {id: procesoId}
        });
        return res.status(200).json(UpdateProceso);
      }
      else {
        const añoSemestre = año + '~' + semestre
        const UpdateProceso = await Proceso.update({
          estado: estado,
          año: año,
          semestre: semestre,
          añoSemestre: añoSemestre
        }, {
          where: {id: procesoId}
        });
        return res.status(200).json(UpdateProceso);
      }
    } catch(error){
      console.log(error);
      return(res.status(400).send(error))
    }
  },
  async EliminarProceso(req, res){
    try {
      const {procesoId} = req.params;
      console.log(procesoId);
      const ProcesoEliminar = await Proceso.findOne({where: {id: procesoId}});
      const ProcesoEliminarData = ProcesoEliminar.dataValues;
      if (ProcesoEliminarData.estado === 'creating') {
        await ProcesoEliminar.destroy();
        return res.status(201).json({message: 'Proceso Eliminado'});
      }
      else {
        return res.status(400).json({message: 'No se puede eliminar el proceso'})
      }
    } catch(error){
      console.log(error);
      return(res.status(400).send(error))
    }
  }
}
