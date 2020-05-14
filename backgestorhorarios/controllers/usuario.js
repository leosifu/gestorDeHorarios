const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const excelToJson = require('convert-excel-to-json');
var fs = require('fs');
var XLSX = require('xlsx');
const _ = require('lodash');

const { Op } = require("sequelize");

const Rol = require('../models').Rol;
const Proceso = require('../models').Proceso;
const Usuario = require('../models').Usuario;
const RolUsuario = require('../models').RolUsuario;
const UsuarioProceso = require('../models').UsuarioProceso;
const Coordinacion = require('../models').Coordinacion;
const Asignatura = require('../models').Asignatura;
const Bloque = require('../models').Bloque;
const Malla = require('../models').Malla;
const InfoAsignatura = require('../models').InfoAsignatura;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const EditRoles = async(rolesData, id) => {
  const UserRoles = await RolUsuario.findAll({
    where: {
      usuarioId: id,
      rolId: {[Op.not]: 1}
    }
  });
  const PrevRoles = UserRoles.map(rol => rol.dataValues.rol);
  const RolesFaltantes = rolesData.filter(rol => PrevRoles.indexOf(rol) === -1);
  const EliminarRoles = PrevRoles.filter(rol => rolesData.indexOf(rol) === -1);
  for (var i = 0; i < EliminarRoles.length; i++) {
    if (EliminarRoles[i] === 'profe') {
      const ProcesoUsuario = await UsuarioProceso.findOne({
        where: {
          usuarioId: id,
          procesoId: procesoId
        }
      });
      if (ProcesoUsuario) {
        ProcesoUsuario.destroy();
      }
    }
    else {
      EliminarRoles[i].destroy();
    }
  }
  const AsignarRoles = RolesFaltantes.map(rol => {
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
  const NuevosRoles = await RolUsuario.bulkCreate(AsignarRoles);
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
      const {procesoId} = req.params;
      console.log(procesoId);
      const ProfesoresByProceso = await Usuario.findAll({
        include: [{
          model: Proceso, as: 'profesores', where: {id: procesoId}
        }, {
          model: Rol, as: 'roles'
        }]
      });
      console.log('-----PROFESORES-----');
      console.log(ProfesoresByProceso);
      console.log('-----FIN PROFESORES-----');
      const ProfesoresWithRol = ProfesoresByProceso.map(profesor => {
        const UserRoles = profesor.roles
        const UserRolesData = UserRoles.map(rol => rol.dataValues.rol);
        return({...profesor.dataValues, roles: UserRolesData})
      })
      // const RolProfesorData = RolProfesor.map(rolProfesor => rolProfesor.dataValues);
      // const Profesores = RolProfesorData.map(rolProfesor => rolProfesor.Usuario);
      // const ProfesoresData = Profesores.filter(profesor => profesor);

      return res.status(201).send(ProfesoresWithRol);
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
        }
        else {
          noRole.push({...UsuariosData[i], roles: UserRolesData})
        }
      }
      let usuariosSeparados = {
        coordinadores: coordinadores,
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
      const {usuarioData, rolesData, procesoId} = req.body;
      const FindProfesor = await Usuario.findOne({
        where: {
          email: usuarioData.email
        }
      })
      if (!FindProfesor) {
        const NuevoProfesor = await Usuario.create(usuarioData);
        const NuevoProfesorData = NuevoProfesor.dataValues;
        const id = NuevoProfesorData.id;
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
        if (rolesData.includes('profe')) {
          const AsignarProceso = await UsuarioProceso.create({
            usuarioId: NuevoProfesorData.id,
            procesoId: procesoId
          });
        }
        return res.status(201).send(NuevoProfesor)
      }
      else {
        console.log('Encontro usuario');
        const id = FindProfesor.dataValues.id;
        const UserRoles = await RolUsuario.findAll({
          where: {
            usuarioId: id,
            rolId: {[Op.not]: 1}
          },
          include: [{model: Rol}]
        });
        console.log(UserRoles);
        const PrevRoles = UserRoles.map(rol => rol.dataValues.Rol.rol);
        console.log(PrevRoles);
        const RolesFaltantes = rolesData.filter(rol => PrevRoles.indexOf(rol) === -1);
        console.log(RolesFaltantes);
        console.log('Asignando roles');
        const AsignarRoles = RolesFaltantes.map(rol => {
          if (rol === 'coordinador') {
            return({
              rolId: 3,
              usuarioId: id
            })
          }
          else if (rol === 'profe') {
            return({
              rolId: 2,
              usuarioId: id
            })
          }
        });
        const NuevosRoles = await RolUsuario.bulkCreate(AsignarRoles);
        if (AsignarRoles.includes('profe')) {
          console.log('Asignando proceso...');
          const AsignarProceso = await UsuarioProceso.create({
            usuarioId: id,
            procesoId: procesoId
          });
        }
        return res.status(201).send(FindProfesor)
      }
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  },
  // async addProfesor(req, res){
  //   try {
  //     const {usuarioData, rolesData, procesoId} = req.body;
  //     const [NuevoProfesor, created] = await Usuario.findOrCreate({
  //       where: usuarioData,
  //       include: [{model: Proceso, where: {id: procesoId}}]
  //     });
  //     const NuevoProfesorData = NuevoProfesor.dataValues;
  //     if (created) {
  //       const NuevosRoles = await RolUsuario.create({
  //         rolId: 2,
  //         usuarioId: NuevoProfesorData.id
  //       });
  //     }
  //     const AsignarProceso = await UsuarioProceso.create({
  //       usuarioId: NuevoProfesorData.id,
  //       procesoId: procesoId
  //     });
  //     return res.status(201).send(NuevoProfesor)
  //   } catch (error) {
  //     console.log(error);
  //     return(res.status(400).send(error));
  //   }
  // },
  async editUsuario(req, res){
    try {
      const {id} = req.params;
      const {usuarioData, rolesData, procesoId} = req.body;
      const UserEdit = await Usuario.update(usuarioData, {
        where: {id: req.params.id}
      });
      // const CheckRoles = await EditRoles(rolesData, id);
      const UserRoles = await RolUsuario.findAll({
        where: {
          usuarioId: id,
          rolId: {[Op.not]: 1}
        },
        include: [{model: Rol}]
      });
      console.log(UserRoles);
      const PrevRoles = UserRoles.map(rol => rol.dataValues.Rol.rol);
      console.log(PrevRoles);
      console.log(rolesData);
      const RolesFaltantes = rolesData.filter(rol => PrevRoles.indexOf(rol) === -1);
      const EliminarRoles = PrevRoles.filter(rol => rolesData.indexOf(rol) === -1);
      console.log(EliminarRoles);
      for (var i = 0; i < EliminarRoles.length; i++) {
        if (EliminarRoles[i] === 'profe') {
          const ProcesoUsuario = await UsuarioProceso.findOne({
            where: {
              usuarioId: id,
              procesoId: procesoId
            }
          });
          if (ProcesoUsuario) {
            ProcesoUsuario.destroy();
          }
        }
        else {
          const EliminarRol = UserRoles.find(rol => rol.dataValues.Rol.rol === EliminarRoles[i]);
          console.log(EliminarRol.dataValues);
          EliminarRol.destroy();
        }
      }
      console.log(RolesFaltantes);
      const AsignarRoles = RolesFaltantes.map(rol => {
        if (rol === 'coordinador') {
          return({
            rolId: 3,
            usuarioId: id
          })
        }
        else if (rol === 'profe') {
          return({
            rolId: 2,
            usuarioId: id
          })
        }
      });
      const NuevosRoles = await RolUsuario.bulkCreate(AsignarRoles);
      if (rolesData.includes('profe') ) {
        const CheckAsignacion = await UsuarioProceso.findOne({
          where: {
            usuarioId: id,
            procesoId: procesoId
          }
        })
        if (!CheckAsignacion) {
          const AsignarProceso = await UsuarioProceso.create({
            usuarioId: id,
            procesoId: procesoId
          });
        }
      }
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
      const HorarioProfesor = await Malla.findAll({
        where: {procesoId: procesoId},
        include:[{model:Asignatura, as:'asignaturas',
          include: [{model:Coordinacion, as:'coordinaciones',
            include:[{model: Bloque, as:'bloques'}, {model: Usuario, as: 'profesores',
              where: {id: usuarioId},
              include: [{model: Proceso, as: 'profesores'}]
            }]}]
        }]
      })
      const GetMallas = [].concat(...HorarioProfesor)
      const GetAsignaturasHorario = [].concat(...GetMallas.map(malla => malla.dataValues.asignaturas))
      console.log(GetAsignaturasHorario);
      const AsignarValores = GetAsignaturasHorario.map(asignatura => {
        console.log(asignatura);
        return({
          ...asignatura.InfoAsignatura.dataValues,
          Asignatura: asignatura.dataValues
        })
      })
      // console.log(GetHorario);

      // console.log();
      // GetHorario.map(horario => {
      //   console.log(horario.dataValues.Asignatura.dataValues.coordinaciones)
      // })
      // console.log(GetHorario[3].dataValues.Asignatura.dataValues.coordinaciones[0].dataValues.profesores[0].dataValues.profesores);
      // console.log(GetHorario.map(horario => horario.dataValues));
      // const asignaturas = GetHorario.map(infoA=>{
      //   // console.log(infoA.Asignatura.dataValues);
      //   infoA.Asignatura.dataValues.cod_asignatura = infoA.cod_asignatura
      //   infoA.Asignatura.dataValues.nombre_asignatura = infoA.nombre_asignatura
      //   return infoA.Asignatura
      // })
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

      // console.log(GetHorario);
      return res.status(201).send(AsignarValores);
    } catch (error) {
      console.log(error);
      return(res.status(400).send(error));
    }
  }
}
