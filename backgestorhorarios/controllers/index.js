const carrera = require('./carrera')
const malla = require('./malla')
const asignatura = require('./asignatura')
const dependencia = require('./dependencia')
const coordinacion = require('./coordinacion')
const bloque = require('./bloque')
const infocoordinacion = require('./infoCoordinacion')
const infoasignatura = require('./infoAsignatura')
const historial = require('./historial')
const nuevoProceso = require('./nuevoProceso')
const profesor = require('./profesor')

module.exports = {
  carrera,
  malla,
  infoasignatura,
  asignatura,
  historial,
  dependencia,
  infocoordinacion,
  coordinacion,
  bloque,
  nuevoProceso,
  profesor
}
