var assert = require('assert');
var chai = require('chai');
var sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const CarreraModel = require('../../../models/carrera')

describe('Carrera Model', () => {

  const Carrera = CarreraModel(sequelize, dataTypes)

  describe('models/Carrera - Table Name Check', () => {
    checkModelName(Carrera)('Carrera')
  })

  describe('models/carrera', () => {
    const instance = new Carrera()
    ;['nombre_carrera', 'jornada'].forEach(
      checkPropertyExists(instance)
    )
    // context('properties', () => {
    //   ;['name', 'email'].forEach(checkPropertyExists(instance))
    // })
  })

  describe('Carrera associations', () => {
    const Malla = ''

    beforeAll(() => {
      Carrera.associate({ Malla })
    })

    it('defined a HasMany association with Mallas as mallas', () => {
      expect(Carrera.hasMany).to.have.been.calledWith(Malla, {
        foreignKey: 'carreraId',
        as: 'mallas'
      })
    })
  })
})
