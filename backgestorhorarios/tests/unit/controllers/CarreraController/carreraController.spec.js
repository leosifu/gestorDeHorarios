const app = require('../../../../index')
const carrerasFake = require('./carreras.json');

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

  describe('GET /api/carreras', () => {
    it('should return all carreras', (done) => {
      this.get.yields(null, carrerasFake.all.success.res, JSON.stringify(carrerasFake.all.success.body));
      axios.get(`${base}/api/carreras`, (err, res, body) => {
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
        // key-value pair of {"data": [3 movie objects]}
        body.data.length.should.eql(2);
        // the first object in the data array should
        // have the right keys
        body.data[0].should.include.keys(
          'id', 'nombre_carrera', 'jornada'
        );
        // the first object should have the right value for name
        body.data[0].nombre_carrera.should.eql('Ingenieria de Ejecucion en Computacion e Informatica');
        done();
      });
    });
  });

  describe('GET /api/carrera/:id', () => {
    it('should return all carreras from a proceso', (done) => {
      this.get.yields(null, carrerasFake.allByProceso.success.res,
        JSON.stringify(carrerasFake.allByProceso.success.body));
      axios.get(`${base}/api/carrera/1`, (err, res, body) => {
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
        // key-value pair of {"data": [3 movie objects]}
        body.data.length.should.eql(2);
        // the first object in the data array should
        // have the right keys
        body.data[0].should.include.keys(
          'id', 'nombre_carrera', 'jornada', 'mallas'
        );
        body.data[0].mallas[0].should.include.keys(
          'id', 'carreraId', 'procesoId'
        );
        // the first object should have the right value for name
        body.data[0].nombre_carrera.should.eql('Ingenieria de Ejecucion en Computacion e Informatica');
        done();
      });
    });
    it('should return an error if proceso does not exist', (done) => {
      const obj = carrerasFake.allByProceso.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/carrera/999`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That proceso does not exist.');
        done();
      });
    });
  });

  describe('POST /api/carrera', () => {
    it('should return the carrera that was added', (done) => {

      const options = {
        url: `${base}/api/carrera`,
        body: {
          nombre_carrera: 'Prueba Carrera',
          jornada: 'Vespertino',
        },
      };
      const obj = carrerasFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'nombre_carrera', 'jornada'
        );
        body.data[0].nombre_carrera.should.eql('Prueba Carrera');
        body.data[0].jornada.should.eql('Diurno');
        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/carrera`,
        body: {
          nombre_carrera: 'Prueba Carrera',
        },
      };
      const obj = carrerasFake.add.failure;
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
    it('should return the movie that was updated', (done) => {
      const options = {
        body: { jornada: 'Diurno' },
        json: true,
        url: `${base}/api/carrera/2`
      };
      const obj = carrerasFake.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id', 'nombre_carrera', 'jornada'
        );
        body.data[0].nombre_carrera.should.eql('Ingenieria Civil Informatica');
        body.data[0].jornada.should.eql('Diurno');
        done();
      });
    });

    it('should throw an error if the movie does not exist', (done) => {
      const options = {
        body: { rating: 9 },
        json: true,
        url: `${base}/api/carrera/999`
      };
      const obj = carrerasFake.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That carrera does not exist.');
        done();
      });
    });
  });

})
