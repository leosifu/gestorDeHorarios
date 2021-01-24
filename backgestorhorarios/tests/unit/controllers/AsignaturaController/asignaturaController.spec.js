const app = require('../../../../index')
const asignaturasFake = require('./asignaturas.json');

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

describe('controllers/carreraController', () => {

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

  describe('GET /api/asignaturaReq/:id/:mallaId/:procesoId', () => {
    it('should return asignaturas with requisitos by id', (done) => {
      this.get.yields(null, asignaturasFake.asignaturasAndRequisitos.success.res, JSON.stringify(asignaturasFake.asignaturasAndRequisitos.success.body));
      axios.get(`${base}/api/asignaturaReq/1/1/1`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(201);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'cod_asignatura', 'nombre_asignatura', 'tel_T', 'tel_E', 'tel_T', 'requisitos'
        );

        body.data.cod_asignatura.should.eql(13253);
        body.data.nombre_asignatura.should.eql('Paradigmas de Programación');
        body.data.tel_T.should.eql(4);
        body.data.tel_E.should.eql(0);
        body.data.tel_L.should.eql(2);

        body.data.requisitos[0].should.include.keys(
          'id', 'cod_asignatura', 'nombre_asignatura', 'tel_T', 'tel_E', 'tel_T'
        );
        body.data.requisitos[0].cod_asignatura.should.eql(13273);
        body.data.requisitos[0].nombre_asignatura.should.eql('Estructura de Computadores');
        body.data.requisitos[0].tel_T.should.eql(2);
        body.data.requisitos[0].tel_E.should.eql(1);
        body.data.requisitos[0].tel_L.should.eql(4);

        done();
      });
    });
    it('should return an error if asignatura does not exist', (done) => {
      const obj = asignaturasFake.asignaturasAndRequisitos.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/asignaturaReq/999/1/1`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That asignatura does not exist.');
        done();
      });
    });
  });

  describe('POST /api/asignatura', () => {
    it('should return the asignatura that was added', (done) => {

      const options = {
        url: `${base}/api/asignatura`,
        body: {
          cod_asignatura: '12354',
          nombre_asignatura: 'Análisis de Algoritmos y Estructura de Datos',
          tel_T: 4,
          tel_E: 0,
          tel_L: 2
        },
      };
      const obj = asignaturasFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'cod_asignatura', 'nombre_asignatura', 'tel_T', 'tel_E', 'tel_T'
        );

        body.data.cod_asignatura.should.eql(12354);
        body.data.nombre_asignatura.should.eql('Análisis de Algoritmos y Estructura de Datos');
        body.data.tel_T.should.eql(4);
        body.data.tel_E.should.eql(0);
        body.data.tel_L.should.eql(2);

        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/carrera`,
        body: {
          cod_asignatura: '12354',
          tel_T: 4,
          tel_E: 0,
          tel_L: 2
        },
      };
      const obj = asignaturasFake.add.failure;
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

  describe('PUT /api/carrera/:id', () => {
    it('should return the carrera that was updated', (done) => {
      const options = {
        body: { cod_asignatura: 12345 },
        json: true,
        url: `${base}/api/carrera/2`
      };
      const obj = asignaturasFake.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'cod_asignatura', 'nombre_asignatura', 'tel_T', 'tel_E', 'tel_T'
        );

        body.data.cod_asignatura.should.eql(12345);
        body.data.nombre_asignatura.should.eql('Análisis de Algoritmos y Estructura de Datos');
        body.data.tel_T.should.eql(4);
        body.data.tel_E.should.eql(0);
        body.data.tel_L.should.eql(2);

        done();
      });
    });

    it('should throw an error if the carrera does not exist', (done) => {
      const options = {
        body: { cod_asignatura: 12345 },
        json: true,
        url: `${base}/api/carrera/999`
      };
      const obj = asignaturasFake.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That asignatura does not exist.');
        done();
      });
    });
  });

})
