const admin = require('firebase-admin');

const Proceso = require('../models').Proceso;
const Usuario = require('../models').Usuario;
const Rol = require('../models').Rol;

module.exports = {
  create(req, res){
    return Proceso
      .create({
        año: req.body.año,
        semestre: req.body.semestre,
        estado: 'creating'
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
      admin.auth().verifyIdToken(token[1]).then(async(claims) => {
        // console.log('claims', claims);
        if (claims.uid) {
          const UsuarioFind = await Usuario.findAll({
            where: {
              email: claims.email
            },
            include: [{
              model: Rol, as: 'roles'
            }]
          })
          const UserRoles = UsuarioFind[0].dataValues.roles.map(rol => rol.dataValues);
          const UserRolesNames = UserRoles.map(rol => rol.rol).sort();
          if (UserRolesNames.includes('admin')){
            return Proceso
              .findAll({})
              .then(proceso =>res.status(200).json(proceso))
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
      }).catch(error => {
        console.log(error);
        return res.status(401).json({ message: 'Usuario no Autorizado'})
      });
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
}
