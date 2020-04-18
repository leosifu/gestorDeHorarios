const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const Usuario = require('../models').Usuario;
const Rol = require('../models').Rol;

module.exports = {
  login(req, res){
    console.log(req.body);
    let idToken = req.get('Authorization');
    const token = idToken.split(' ');
    // const {token, user} = req.body;
    console.log('TOKEEEEEEN', token[0]);
    // if (token[1]) {
    //   console.log('------------------WIIIIIIIIIII-------------------');
    //   jwt.verify(token[1], process.env.FIREBASE_CLIENT_X509_CERT_URL, (err, decoded) => {
    //     console.log('------------------DECODED-------------------');
    //     if (err) {
    //       console.log('------------------FALLOOOOOOOOOOOOO-------------------');
    //       console.log(err);
    //       return res.json({ mensaje: 'Token inválida' });
    //     } else {
    //       console.log('AHHHHHHHHHH', decoded);
    //       // req.decoded = decoded;
    //       next();
    //     }
    //   });
    // }
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
        return(res.status(201).send(UsuarioFind))
      }
    }).catch(error => {
      console.log(error);
      res.send({message: 'Invalid user'}).end();
    });
  },
  create(req, res){
    console.log(req.body);
    var profesores = req.body.slice(2, req.body.length-1)
    console.log(profesores);
    const CampoProfesor = profesores.map((profesor, n)=>{
      return({
        name: profesor[1],
        rut: profesor[2],
        email: profesor[3],
      })
    })
    console.log('profesoresData', CampoProfesor);
    return Profesor
      .bulkCreate(CampoProfesor)
      .then(profesores=>{
        console.log(profesores);
      })
      .catch(error=>console.log(error))
  }
}
