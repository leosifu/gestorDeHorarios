const app = require('../../../../index')
const coordinacionesFake = require('./coordinaciones.json');

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

describe('controllers/coordinacionController', () => {

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

  describe('POST /api/coordinacion', () => {
    it('should return the coordinacion that was added', (done) => {

      const options = {
        url: `${base}/api/coordinacion`,
        body: {
          tipo_coord: 'Teoría',
          num_bloques: 3,
          cod_coord: 'C3',
          nombre_coord: 'Estructura de Computadores',
          asignaturaId: 1
        },
      };
      const obj = coordinacionesFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'tipo_coord', 'num_bloques', 'InfoCoordinacion', 'bloques', 'profesores'
        );
        body.data.id.should.eql(3);
        body.data.tipo_coord.should.eql('Teoría');
        body.data.num_bloques.should.eql(3);

        body.data.InfoCoordinacion.should.include.keys(
          'cod_coord', 'asignaturaId', 'coordinacionId', 'infoC_id', 'nombre_coord'
        );
        body.data.InfoCoordinacion.asignaturaId.should.eql(1);
        body.data.InfoCoordinacion.cod_coord.should.eql('C3');
        body.data.InfoCoordinacion.coordinacionId.should.eql(3);
        body.data.InfoCoordinacion.infoC_id.should.eql('1~C3~Estructura de Computadores');
        body.data.InfoCoordinacion.nombre_coord.should.eql('Estructura de Computadores');

        body.data.bloques.length.should.eql(3);
        body.data.bloques[0].should.include.keys(
          'id', 'asignado', 'coordinacionId', 'num_bloque'
        );
        body.data.bloques[0].id.should.eql(7);
        body.data.bloques[0].asignado.should.eql(false);
        body.data.bloques[0].coordinacionId.should.eql(3);
        body.data.bloques[0].num_bloque.should.eql(1);

        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/coordinacion`,
        body: {
          num_bloques: 3,
          cod_coord: 'C3',
          nombre_coord: 'Estructura de Computadores',
          asignaturaId: 1
        },
      };
      const obj = coordinacionesFake.add.failure;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);

        body.status.should.eql('error');
        should.exist(body.message);

        done();
      });
    });
  });

  describe('PUT /api/coordinacion/:id', () => {
    it('should return the coordinacion that was updated', (done) => {
      const options = {
        body: { tipo_coord: 'Ejercicios' },
        json: true,
        url: `${base}/api/coordinacion/3`
      };
      const obj = coordinacionesFake.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'tipo_coord', 'num_bloques'
        );
        body.data.id.should.eql(3);
        body.data.tipo_coord.should.eql('Ejercicios');
        body.data.num_bloques.should.eql(3);

        done();
      });
    });

    it('should throw an error if the coordinacion does not exist', (done) => {
      const options = {
        body: { tipo_coord: 'Ejercicios' },
        json: true,
        url: `${base}/api/coordinacion/999`
      };
      const obj = coordinacionesFake.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);

        body.status.should.eql('error');
        body.message.should.eql('That coordinacion does not exist.');

        done();
      });
    });
  });

})
