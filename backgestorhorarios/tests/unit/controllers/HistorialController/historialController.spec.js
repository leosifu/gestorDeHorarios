const app = require('../../../../index')
const historialFake = require('./historial.json');

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

  describe('PUT /api/historial/:id', () => {
    it('should return the historial that was updated', (done) => {
      const options = {
        body: {
          cupos_pasados: 30
        },
        json: true,
        url: `${base}/api/historial/1`
      };
      const obj = historialFake.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'cupos_pasados', 'tasa_reprobacion', 'desinscripciones', 'cupos_estimados', 'asignaturaId'
        );

        body.data.id.should.eql(1);
        body.data.cupos_pasados.should.eql(30);
        body.data.tasa_reprobacion.should.eql(10);
        body.data.desinscripciones.should.eql(5);
        body.data.cupos_estimados.should.eql(22);
        body.data.asignaturaId.should.eql(1);

        done();
      });
    });

    it('should throw an error if the historial does not exist', (done) => {
      const options = {
        body: { cupos_pasados: 30 },
        json: true,
        url: `${base}/api/dependencia/999`
      };
      const obj = historialFake.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That historial does not exist.');
        done();
      });
    });
  });

})
