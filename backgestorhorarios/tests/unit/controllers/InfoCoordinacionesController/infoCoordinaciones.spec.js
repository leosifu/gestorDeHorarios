const app = require('../../../../index')
const infoCoordinacionesFake = require('./infoCoordinaciones.json');

const sinon = require('sinon')
const axios = require('axios');
const chai = require('chai');
const should = chai.should();

var iconv = require('iconv-lite')
const encodings = require('iconv-lite/encodings')
iconv.encodings = encodings;
// require('iconv-lite').encodingExists('cesu8')

const uid = 'test-uid'; // You can name it whatever you want.

const base = 'http://localhost:8000';

describe('controllers/infoCoordinacionController', () => {

  beforeEach(() => {
    this.get = sinon.stub(axios, 'get');
    this.post = sinon.stub(axios, 'post');
    this.put = sinon.stub(axios, 'put');
  });

  afterEach(() => {
    axios.get.restore();
    axios.post.restore();
    axios.put.restore();
  });

  describe('GET /api/coordinacions/:id', () => {
    it('should return all coordinaciones from a asignatura', (done) => {
      this.get.yields(null, infoCoordinacionesFake.allByAsignatura.success.res,
        JSON.stringify(infoCoordinacionesFake.allByAsignatura.success.body));
      axios.get(`${base}/api/coordinacions/1`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(201);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": [3 carrera objects]}
        body.data.length.should.eql(2);
        // the first object in the data array should
        // have the right keys
        body.data[0].should.include.keys(
          'asignaturaId', 'cod_coord', 'coordinacionId', 'infoC_id', 'nombre_coord', 'Coordinacion'
        );
        body.data[0].asignaturaId.should.eql(1);
        body.data[0].cod_coord.should.eql('A1');
        body.data[0].coordinacionId.should.eql(1);
        body.data[0].infoC_id.should.eql('1~A1~Estructura de Computadores');
        body.data[0].nombre_coord.should.eql('Estructura de Computadores');

        body.data[0].Coordinacion.should.include.keys(
          'id', 'num_bloques', 'tipo_coord'
        );
        body.data[0].Coordinacion.id.should.eql(1);
        body.data[0].Coordinacion.num_bloques.should.eql(3);
        body.data[0].Coordinacion.tipo_coord.should.eql('Teoría');

        // the first object should have the right value for name
        done();
      });
    });
    it('should return an error if asignatura does not exist', (done) => {
      const obj = infoCoordinacionesFake.allByAsignatura.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/coordinacions/999`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That infoCoordinacion does not exist.');
        done();
      });
    });
  });

  describe('POST /api/asigncoord', () => {
    it('should return the infoCoordinacion that was added', (done) => {

      const options = {
        url: `${base}/api/asigncoord`,
        body: {
          asignaturaId: 1,
          coordinacionId: 3,
          nombre_coord: 'Estructura de Computadores',
          cod_coord: 'C3',
          infoC_id: '1~C3~Estructura de Computadores'
        },
      };
      const obj = infoCoordinacionesFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'asignaturaId', 'cod_coord', 'coordinacionId', 'infoC_id', 'nombre_coord'
        );
        body.data.asignaturaId.should.eql(1);
        body.data.cod_coord.should.eql('C3');
        body.data.coordinacionId.should.eql(3);
        body.data.infoC_id.should.eql('1~C3~Estructura de Computadores');
        body.data.nombre_coord.should.eql('Estructura de Computadores');

        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/asigncoord`,
        body: {
          asignaturaId: 1,
          coordinacionId: 3,
          nombre_coord: 'Estructura de Computadores',
          cod_coord: 'C3'
        },
      };
      const obj = infoCoordinacionesFake.add.failure;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(400);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        should.exist(body.message);
        done();
      });
    });
  });

  describe('DELETE /api/infoCoordinacion/:asignaturaId/:coordinacionId', () => {
    it('should return the infoCoordinacion that was deleted', (done) => {
      const options = {
        url: `${base}/api/infoCoordinacion/1/1`
      };
      const obj = infoCoordinacionesFake.delete.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.message.should.eql('InfoCoordinacion eliminada');
        done();
      });
    });

    it('should throw an error if the infoCoordinacion does not exist', (done) => {
      const options = {
        url: `${base}/api/infoCoordinacion/1/1`
      };
      const obj = infoCoordinacionesFake.delete.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That infoCoordinacion does not exist.');
        done();
      });
    });
  });

})
