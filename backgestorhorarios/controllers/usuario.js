const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const excelToJson = require('convert-excel-to-json');
var fs = require('fs');
var XLSX = require('xlsx');
const _ = require('lodash');

const Rol = require('../models').Rol;
const Usuario = require('../models').Usuario;
const RolUsuario = require('../models').RolUsuario;
const UsuarioProceso = require('../models').UsuarioProceso;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

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
        return(res.status(201).send(UsuarioFind[0]))
      }
    }).catch(error => {
      console.log(error);
      res.send({message: 'Invalid user'}).end();
    });
  },
  async createProfesores(req, res){
    try {
      console.log('----------AHHHHHHHHHH----------');
      console.log(req.body);
      console.log('----------AHHHHHHHHHH----------');
      var workbook = XLSX.read(req.file.buffer);
      const sheetNames = workbook.SheetNames;
      const profesoresData = sheetNames.map(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const headers = {};
        const data = [];
        for(x in sheet){
          if (x[0] === '!') {
            continue;
          }
          var col = x.substring(0,1);
          var row = parseInt(x.substring(1));
          var value = sheet[x].v;

          if(row == (sheet === 'JC' ? 3 : 2)) {
              headers[col] = value.replace(/\s/g, '');
              continue;
          }
          if(!data[row]) data[row]={};
          data[row][headers[col]] = value;
        }
        data.shift();
        data.shift();
        return data
      })
      const {procesoId} = req.body;
      const AllProfesoresDuplicated = [].concat(...profesoresData);
      const AllProfesores = AllProfesoresDuplicated.map(profesor => {
        const ProfesorNombreCompleto = profesor.NOMBREPROFESOR.replace(',', '');
        const ProfesorAllNombre = ProfesorNombreCompleto.split(' ');
        const ProfesorNombreFormat = ProfesorAllNombre.map(nombre => toTitleCase(nombre));
        const ProfesorApellido = ProfesorNombreFormat[0] + ' ' + ProfesorNombreFormat[1];
        let ProfesorNombre = '';
        for (var i = 2; i < ProfesorNombreFormat.length; i++) {
          if (i === ProfesorNombreFormat.length - 1) {
            ProfesorNombre = ProfesorNombre + ProfesorNombreFormat[i];
          }
          else {
            ProfesorNombre = ProfesorNombre + ProfesorNombreFormat[i] + ' ';
          }
        }
        return ({
          name: ProfesorNombre,
          lastName: ProfesorApellido,
          rut: profesor.RUT,
          email: profesor.CORREO,
        })
      });
      const ProfesoresFinal = AllProfesores.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t && t.rut === thing.rut
        ))
      )
      for (var i = 0; i < ProfesoresFinal.length; i++) {
        const ProfesorFinal = ProfesoresFinal[i];
        const [NuevoProfesor, created] = await Usuario.findOrCreate({
          where: ProfesorFinal
        });
        const NuevoProfesorData = NuevoProfesor.dataValues;
        if (created) {
          const AsignarRoles = await RolUsuario.create({
            rolId: 2,
            usuarioId: NuevoProfesorData.id
          });
        }
        const AsignarProceso = await UsuarioProceso.create({
          procesoId: procesoId,
          usuarioId: NuevoProfesorData.id
        });
      }
      // const ProfesoresCreated = await Usuario.bulkCreate(ProfesoresFinal);
      // const ProfesoresCreatedIDs = ProfesoresCreated.map(profesor => profesor.dataValues.id);
      // const AsignarRoles = ProfesoresCreatedIDs.map(id => ({
      //   rolId: 2,
      //   usuarioId: id
      // }))
      // const ProfesorRoles = await RolUsuario.bulkCreate(AsignarRoles);
      return res.status(201).send(ProfesoresFinal);
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  },
  async getProfesores(req, res){
    try {
      const RolProfesor = await RolUsuario.findAll({
        where: {rolId: 2},
        include: [{model: Usuario}]
      });
      const RolProfesorData = RolProfesor.map(rolProfesor => rolProfesor.dataValues);
      const Profesores = RolProfesorData.map(rolProfesor => rolProfesor.Usuario);
      const ProfesoresData = Profesores.map(profesor => profesor.dataValues);
      return res.status(201).send(ProfesoresData);
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  }
}
