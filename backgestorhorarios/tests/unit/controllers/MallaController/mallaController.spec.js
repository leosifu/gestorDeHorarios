const app = require('../../../../index')
const mallasFake = require('./malla.json');

const sinon = require('sinon')
const axios = require('axios');
const chai = require('chai');
const should = chai.should();

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

  describe('GET /api/mallas/:id', () => {
    it('should return all mallas from a carrera', (done) => {
      const obj = mallasFake.allByCarrera.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/mallas/1`, (err, res, body) => {
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
          'id', 'cod_malla', 'fecha_resolucion', 'n_niveles', 'carreraId', 'procesoId'
        );
        // the first object should have the right value for name
        body.data[0].cod_malla.should.eql(1353);
        body.data[0].fecha_resolucion.should.eql("23/08/2015");
        body.data[0].n_niveles.should.eql(8);
        body.data[0].carreraId.should.eql(1);
        body.data[0].procesoId.should.eql(1);
        done();
      });
    });
  });

  describe('GET /api/malla/:mallaId/:procesoId', () => {
    it('should return all carreras from a proceso', (done) => {
      const obj = mallasFake.singleMallaByProceso.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/malla/:mallaId/:procesoId`, (err, res, body) => {
        res.statusCode.should.eql(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.should.include.keys(
          'id', 'cod_malla', 'fecha_resolucion', 'n_niveles', 'carreraId', 'procesoId', 'Carrera',
          'niveles'
        );
        body.data.cod_malla.should.eql(1353);
        body.data.fecha_resolucion.should.eql("23/08/2015");
        body.data.n_niveles.should.eql(8);
        body.data.carreraId.should.eql(1);
        body.data.procesoId.should.eql(1);

        body.data.niveles[0].should.include.keys(
          'nivel', 'asignaturas'
        );

        body.data.Carrera.should.include.keys(
          'id', 'nombre_carrera', 'jornada'
        );
        done();
      });
    });
    it('should return an error if proceso does not exist', (done) => {
      const obj = mallasFake.singleMallaByProceso.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/malla/:mallaId/:procesoId`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That proceso does not exist.');
        done();
      });
    });
  });

  describe('POST /api/malla', () => {
    it('should return the carrera that was added', (done) => {

      const options = {
        url: `${base}/api/malla`,
        body: {
          fecha_resolucion: '23/08/2017',
          cod_malla: 1333,
          n_niveles: 12,
          carreraId: 1,
          procesoId: 1
        },
      };
      const obj = mallasFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'fecha_resolucion', 'cod_malla', 'n_niveles', 'carreraId', 'procesoId'
        );
        body.data[0].fecha_resolucion.should.eql('23/08/2017');
        body.data[0].cod_malla.should.eql(1333);
        body.data[0].n_niveles.should.eql(12);
        body.data[0].carreraId.should.eql(1);
        body.data[0].procesoId.should.eql(1);
        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/malla`,
        body: {
          cod_malla: 1333,
          n_niveles: 12,
          carreraId: 1,
          procesoId: 1
        },
      };
      const obj = mallasFake.add.failure;
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

  describe('PUT /api/malla/:id', () => {
    it('should return the carrera that was updated', (done) => {
      const options = {
        body: {
          fecha_resolucion: '23/08/2018',
          cod_malla: 1313
        },
        json: true,
        url: `${base}/api/malla/2`
      };
      const obj = mallasFake.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'fecha_resolucion', 'cod_malla', 'n_niveles', 'carreraId', 'procesoId'
        );
        body.data[0].fecha_resolucion.should.eql('23/08/2018');
        body.data[0].cod_malla.should.eql(1313);
        done();
      });
    });
    it('should throw an error if the carrera does not exist', (done) => {
      const options = {
        body: {
          fecha_resolucion: '23/08/2018',
          cod_malla: 1313
        },
        json: true,
        url: `${base}/api/malla/999`
      };
      const obj = mallasFake.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That malla does not exist.');
        done();
      });
    });
  });

})
