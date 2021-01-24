const app = require('../../../../index')
const dependenciasFake = require('./dependencias.json');

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

  describe('POST /api/dependencia', () => {
    it('should return the dependencia that was added', (done) => {

      const options = {
        url: `${base}/api/dependencia`,
        body: {
          requisitoId: 1,
          asignaturaId: 2
        },
      };
      const obj = dependenciasFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'asignaturaId', 'requisitoId'
        );

        body.data.asignaturaId.should.eql(2);
        body.data.requisitoId.should.eql(1);

        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/dependencia`,
        body: {
          asignaturaId: 1
        },
      };
      const obj = dependenciasFake.add.failure;
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

  describe('DELETE /api/dependencia', () => {
    it('should return the dependencia that was deleted', (done) => {
      const options = {
        json: true,
        url: `${base}/api/dependencia`,
        body: {
          asignaturaId: 1,
          requisitoId: 999
        }
      };
      const obj = dependenciasFake.delete.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);

        body.status.should.eql('success');
        body.message.should.eql('Dependencia eliminada');

        done();
      });
    });

    it('should throw an error if the carrera does not exist', (done) => {
      const options = {
        json: true,
        url: `${base}/api/dependencia`,
        body: {
          asignaturaId: 1,
          requisitoId: 999
        }
      };
      const obj = dependenciasFake.delete.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);

        body.status.should.eql('error');
        body.message.should.eql('That dependencia does not exist.');

         done();
      });
    });
  });

})
