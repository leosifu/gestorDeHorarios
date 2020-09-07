const app = require('../../../../index.js')
const jwt = require('jsonwebtoken');
const procesosFake = require('./procesos.json');

const sinon = require('sinon')
const axios = require('axios');
const chai = require('chai');
const should = chai.should();

const base = 'http://localhost:8000';

describe('controllers/procesoController', () => {

  beforeEach(() => {
    this.get = sinon.stub(axios, 'get');
    this.post = sinon.stub(axios, 'post');
    this.put = sinon.stub(axios, 'put');
    this.delete = sinon.stub(axios, 'delete');
  });

  afterEach(() => {
    axios.get.restore();
    axios.post.restore();
    axios.put.restore();
    axios.delete.restore();
  });

  describe('GET /api/procesos', () => {
    it('should return all procesos', (done) => {
      const obj = procesosFake.all.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/procesos`, (err, res, body) => {
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
        body.data.length.should.eql(3);
        // the first object in the data array should
        // have the right keys
        body.data[0].should.include.keys(
          'id', 'año', 'añoSemestre', 'semestre', 'estado'
        );
        // the first object should have the right value for name
        body.data[0].año.should.eql(2020);
        body.data[0].añoSemestre.should.eql('2020~1');
        body.data[0].estado.should.eql('active');
        body.data[0].semestre.should.eql(1);
        done();
      });
    });
  });

  describe('POST /api/procesos', () => {

    it('should return the proceso that was added', (done) => {
      const options = {
        url: `${base}/api/procesos`,
        body: {
          año: 2020,
          añoSemestre: "2020~1",
          semestre: 1
        }
      };
      const obj = procesosFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'año', 'añoSemestre', 'semestre', 'estado'
        );
        body.data[0].año.should.eql(2020);
        body.data[0].añoSemestre.should.eql("2020~1");
        body.data[0].estado.should.eql("creating");
        body.data[0].semestre.should.eql(1);
        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/procesos`,
        body: {
          año: 2020,
          estado: "active",
          semestre: 1
        }
      };
      const obj = procesosFake.add.failure;
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

  describe('PUT /api/procesos/:procesoId', () => {
    it('should return the movie that was updated', (done) => {
      const options = {
        body: {
          estado: 'finished'
        },
        json: true,
        url: `${base}/api/procesos/1`
      };
      const obj = procesosFake.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'año', 'añoSemestre', 'semestre', 'estado'
        );
        body.data[0].año.should.eql(2020);
        body.data[0].añoSemestre.should.eql("2020~1");
        body.data[0].estado.should.eql("finished");
        body.data[0].semestre.should.eql(1);
        done();
      });
    });
    it('should throw an error if the proceso does not exist', (done) => {
      const options = {
        body: {
          estado: 'finished'
        },
        json: true,
        url: `${base}/api/procesos/999`
      };
      const obj = procesosFake.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That proceso does not exist.');
        done();
      });
    });
  });

  describe('DELETE /api/procesos/:id', () => {

    it('should return the proceso that was deleted', (done) => {
      const obj = procesosFake.delete.success;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      axios.delete(`${base}/api/procesos/3`, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.message.should.eql('Proceso eliminated.');
        done();
      });
    });

    it('should throw an error if the proceso does not exist', (done) => {
      const obj = procesosFake.delete.failure;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      axios.delete(`${base}/api/procesos/999`, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That proceso does not exist.');
        done();
      });
    });
  });

})
