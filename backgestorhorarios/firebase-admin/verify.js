const admin = require('firebase-admin');

const Usuario = require('../models').Usuario;
const Rol = require('../models').Rol;

const verify = (...roles) => async (req, res, next) => {
  try {
    let idToken = req.get('Authorization');
    if (!idToken) {
      return res.status(401).json({ message: 'Usuario no Autorizado'})
    }
    // console.log(idToken);
    const token = idToken.split(' ');
    // console.log('token', token[1]);
    admin.auth().verifyIdToken(token[1]).then(async(claims) => {
      // console.log('claims', claims);
      if (claims.uid) {
        if (roles.length < 1) {
          return next();
        }
        else {
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
          console.log(roles);
          console.log(UserRolesNames);
          if (roles.length === UserRolesNames.length && roles.sort().every((value, index) => value === UserRolesNames[index])){
            console.log('wiii');
            return next();
          }
        }
        return res.status(401).json({ message: 'Usuario no Autorizado'})
      }
    }).catch(error => {
      console.log(error);
      return res.status(401).json({ message: 'Usuario no Autorizado'})
    });
    // const user = await models.User.findById({_id: req.user.id})
    // if (user.role === 'superAdmin') {
    //   return next()
    // }
    // if (req.params.storeId) {
    //   const store = await models.Store.findById({ _id: req.params.storeId,  });
    //   if (store) {
    //     if (roles.every(role=>store.users.find(userS =>(userS.userId.equals(user.id)) && (userS.access[role] === 1)))){
    //       return next();
    //     }
    //   }
    // }
    // return res.status(401).json({ message: 'Usuario no Autorizado'})
  } catch(error){
    console.log(error);
    return res.status(500).json({message: 'Hubo un Error'});
  }
}

module.exports = verify;
