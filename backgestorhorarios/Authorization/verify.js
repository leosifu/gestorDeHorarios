const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const Usuario = require('../models').Usuario;
const Rol = require('../models').Rol;

const verify = (...roles) => async (req, res, next) => {
  try {
    let idToken = req.get('Authorization');
    console.log(idToken);
    if (!idToken) {
      return res.status(401).json({ message: 'Usuario no Autorizado'})
    }
    // console.log(idToken);
    const token = idToken.split(' ');
    console.log(token);
    // console.log('token', token[1]);
    if (token) {
      jwt.verify(token[1], process.env.KEY, async(err, usuarioData) => {
        if(err){
          //If error send Forbidden (403)
          console.log('ahhhhhh');
          console.log(err);
          console.log('ERROR: Could not connect to the protected route');
          return res.sendStatus(403);
        } else {
          //If token is successfully verified, we can send the autorized data
          console.log(usuarioData);
          if (!usuarioData) {
            console.log('-------NO HAY USUARIO EN DB--------');
          }
          if (roles.length < 1) {
            return next();
          }
          else {
            const UserRoles = usuarioData.roles;
            const UserRolesNames = UserRoles.map(rol => rol.rol).sort();
            if (roles.sort().some(value => UserRolesNames.includes(value))){
              return next();
            }
            else {
              console.log('-------No autorizado-----------');
              return res.status(401).json({ message: 'Usuario no Autorizado'})
            }
          }
        }
      })
    }
    // admin.auth().verifyIdToken(token[1]).then(async(claims) => {
    //   // console.log('claims', claims);
    //   if (claims.uid) {
    //     if (roles.length < 1) {
    //       return next();
    //     }
    //     else {
    //       const UsuarioFind = await Usuario.findAll({
    //         where: {
    //           email: claims.email
    //         },
    //         include: [{
    //           model: Rol, as: 'roles'
    //         }]
    //       })
    //       const UserRoles = UsuarioFind[0].dataValues.roles.map(rol => rol.dataValues);
    //       const UserRolesNames = UserRoles.map(rol => rol.rol).sort();
    //       if (roles.sort().some(value => UserRolesNames.includes(value))){
    //         return next();
    //       }
    //     }
    //     return res.status(401).json({ message: 'Usuario no Autorizado'})
    //   }
    // }).catch(error => {
    //   console.log(error);
    //   return res.status(401).json({ message: 'Usuario no Autorizado'})
    // });
  } catch(error){
    console.log(error);
    return res.status(500).json({message: 'Hubo un Error'});
  }
}

module.exports = verify;
