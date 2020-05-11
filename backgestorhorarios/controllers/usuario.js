const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const excelToJson = require('convert-excel-to-json');
var fs = require('fs');
var XLSX = require('xlsx');
const _ = require('lodash');

const Rol = require('../models').Rol;
const Proceso = require('../models').Proceso;
const Usuario = require('../models').Usuario;
const RolUsuario = require('../models').RolUsuario;
const UsuarioProceso = require('../models').UsuarioProceso;
const Coordinacion = require('../models').Coordinacion;
const Asignatura = require('../models').Asignatura;
const Bloque = require('../models').Bloque;
const InfoAsignatura = require('../models').InfoAsignatura;

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
  },
  async getUsuarios(req, res){
    try {
      const Usuarios = await Usuario.findAll({
        include: [{
          model: Rol, as: 'roles'
        }]
      })
      const UsuariosData = Usuarios.map(usuario => usuario.dataValues);
      let profesores = [];
      let coordinadores = [];
      let noRole = [];
      // console.log(UsuariosData);
      for (var i = 0; i < UsuariosData.length; i++) {
        const UserRoles = UsuariosData[i].roles
        const UserRolesData = UserRoles.map(rol => rol.dataValues.rol);
        if (UserRoles.length > 0) {
          if (UserRolesData.includes('coordinador')) {
            coordinadores.push({...UsuariosData[i], roles: UserRolesData})
          }
          else if (UserRolesData.includes('profe')) {
            profesores.push({...UsuariosData[i], roles: UserRolesData})
          }
        }
        else {
          noRole.push({...UsuariosData[i], roles: UserRolesData})
        }
      }
      let usuariosSeparados = {
        coordinadores: coordinadores,
        profesores: profesores,
        noRole: noRole
      }
      return res.status(201).send(usuariosSeparados);
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  },
  async addUsuario(req, res){
    try {
      const {usuarioData, rolesData} = req.body;
      const [NuevoProfesor, created] = await Usuario.findOrCreate({
        where: usuarioData
      });
      const NuevoProfesorData = NuevoProfesor.dataValues;
      if (created) {
        const UserRoles = rolesData.map(rol => {
          if (rol === 'coordinador') {
            return({
              rolId: 3,
              usuarioId: NuevoProfesorData.id
            })
          }
          else {
            return({
              rolId: 2,
              usuarioId: NuevoProfesorData.id
            })
          }
        });
        const NuevosRoles = await RolUsuario.bulkCreate(UserRoles);
        return res.status(201).send(NuevoProfesor)
      }
      else {
        return res.status(403);
      }
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  },
  async editUsuario(req, res){
    try {
      const {id} = req.params;
      const {usuarioData, rolesData} = req.body;
      const UserEdit = await Usuario.update(usuarioData, {
        where: {id: req.params.id}
      });
      const EliminarRoles = await RolUsuario.findAll({
        where: {
          usuarioId: id
        }
      });
      for (var i = 0; i < EliminarRoles.length; i++) {
        EliminarRoles[i].destroy()
      }
      const UserRoles = rolesData.map(rol => {
        if (rol === 'coordinador') {
          return({
            rolId: 3,
            usuarioId: id
          })
        }
        else {
          return({
            rolId: 2,
            usuarioId: id
          })
        }
      });
      const NuevosRoles = await RolUsuario.bulkCreate(UserRoles);
      return res.status(201).send(UserEdit);
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  },
  async getHorario(req, res){
    try {
      console.log('asdasd');
      const {usuarioId, procesoId} = req.params;
      console.log(usuarioId);
      console.log(procesoId);
      const GetHorario = await InfoAsignatura.findAll({
        include:[{model:Asignatura, as:'Asignatura',
          include: [{model:Coordinacion, as:'coordinaciones',
            include:[{model: Bloque, as:'bloques'}, {model: Usuario, as: 'profesores',
              where: {id: usuarioId},
              include: [{model: Proceso, as: 'profesores', where: {id: procesoId}}]
            }]}]
        }]
      })
      console.log(GetHorario);
      const asignaturas = GetHorario.map(malA=>{
        malA.Asignatura.dataValues.cod_asignatura = malA.cod_asignatura
        malA.Asignatura.dataValues.nombre_asignatura = malA.nombre_asignatura
        return malA.Asignatura
      })
      // const GetHorario = await UsuarioProceso.findAll({
      //   where: {
      //     usuarioId: usuarioId,
      //     procesoId: procesoId
      //   },
      //   include: [{model: Usuario,
      //     include: [{model: Coordinacion, as: 'coordinaciones',
      //       include: [{model: Bloque, as: 'bloques'}, {model: Asignatura, as: 'asignaturas'}]
      //     }]
      //   }]
      // });

      console.log(GetHorario);
      return res.status(201).send(GetHorario);
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  }
}
