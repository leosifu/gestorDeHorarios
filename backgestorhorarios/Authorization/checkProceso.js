const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const Rol = require('../models').Rol;
const Malla = require('../models').Malla;
const Usuario = require('../models').Usuario;
const Proceso = require('../models').Proceso;
const UsuarioProceso = require('../models').UsuarioProceso;

const checkMallaWithProceso = async(mallaId, procesoId) => {
  const FindMalla = await Malla.findOne({
    where: {
      id: mallaId
    }
  });
  if (parseInt(FindMalla.dataValues.procesoId) !== parseInt(procesoId)) {
    return false;
  }
  else {
    return true;
  }
}

const checkProceso = () => async (req, res, next) => {
  try {
    const {procesoId, mallaId} = req.params;
    const procesoIdNumber = parseInt(procesoId)
    let idToken = req.get('Authorization');
    if (idToken.length === 0) {
      const AvailableProcesos = await Proceso.findAll({
        where: {estado: 'active'}
      });
      const AvailableProcesosIDs = AvailableProcesos.map(proceso => parseInt(proceso.dataValues.id));
      if (AvailableProcesosIDs.includes(procesoIdNumber)) {
        if (mallaId) {
          const LastCheck = await checkMallaWithProceso(mallaId, procesoId);
          if (LastCheck) {
            return next();
          }
          else {
            return res.status(401).json({ message: 'Usuario no Autorizado'})
          }
        }
        else {
          return next();
        }
      }
      else {
        return res.status(401).json({ message: 'Usuario no Autorizado'})
      }
    }
    console.log('-----AHHHHH...');
    const token = idToken.split(' ');
    // console.log('token', token[1]);
    console.log(token);
    if (token) {
      jwt.verify(token[1], process.env.KEY, async(err, usuarioData) => {
        if(err){
          //If error send Forbidden (403)
          console.log(err);
          console.log('ERROR: Could not connect to the protected route');
          return res.sendStatus(403);
        } else {
          //If token is successfully verified, we can send the autorized data
          const UserRoles = usuarioData.roles;
          const UserRolesNames = UserRoles.map(rol => rol.rol)
          if (UserRoles.length === 0) {
            const AvailableProcesos = await Proceso.findAll({
              where: {estado: 'active'}
            });
            const AvailableProcesosIDs = AvailableProcesos.map(proceso =>
              parseInt(proceso.dataValues.id));
            if (AvailableProcesosIDs.includes(procesoIdNumber)) {
              if (mallaId) {
                const LastCheck = await checkMallaWithProceso(mallaId, procesoId);
                if (mallaId) {
                  return next();
                }
                else {
                  return res.status(401).json({ message: 'Usuario no Autorizado'})
                }
              }
            }
            else {
              return res.status(401).json({ message: 'Usuario no Autorizado'})
            }
          }
          else if (UserRolesNames.includes('admin') || UserRolesNames.includes('coordinador')) {
            return next();
          }
          else if (UserRolesNames.includes('profe')) {
            const AvailableProcesos = await UsuarioProceso.findAll({
              where: {usuarioId: usuarioData.id}
            });
            console.log(AvailableProcesos);
            const AvailableProcesosIDs = AvailableProcesos.map(proceso =>
              parseInt(proceso.dataValues.procesoId));
            if (AvailableProcesosIDs.includes(procesoIdNumber)) {
              return next();
            }
            else {
              const AvailableProcesosP = await Proceso.findAll({
                where: {estado: 'active'}
              });
              const AvailableProcesosPIDs = AvailableProcesosP.map(proceso =>
                parseInt(proceso.dataValues.id));
              console.log(AvailableProcesosPIDs);
              if (AvailableProcesosPIDs.includes(procesoIdNumber)) {
                if (mallaId) {
                  const LastCheck = await checkMallaWithProceso(mallaId, procesoId);
                  if (mallaId) {
                    return next();
                  }
                  else {
                    return res.status(401).json({ message: 'Usuario no Autorizado'})
                  }
                }
              }
              else {
                console.log('FFFFF');
                return res.status(401).json({ message: 'Usuario no Autorizado'})
              }
              // return res.status(401).json({ message: 'Usuario no Autorizado'})
            }
          }
        }
      })
    }
    else {
      console.log('------NO TOKEEEEEEN-------');
      const AvailableProcesos = await Proceso.findAll({
        where: {estado: 'active'}
      });
      const AvailableProcesosIDs = AvailableProcesos.map(proceso => parseInt(proceso.dataValues.id));
      if (AvailableProcesosIDs.includes(procesoIdNumber)) {
        if (mallaId) {
          const LastCheck = await checkMallaWithProceso(mallaId, procesoId);
          if (mallaId) {
            return next();
          }
          else {
            return res.status(401).json({ message: 'Usuario no Autorizado'})
          }
        }
      }
      else {
        return res.status(401).json({ message: 'Usuario no Autorizado'})
      }
    }
  } catch(error){
    console.log(error);
    return res.status(500).json({message: 'Hubo un Error'});
  }
}

module.exports = checkProceso;
