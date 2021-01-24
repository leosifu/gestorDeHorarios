const app = require('../../../../index')
const bloquesFake = require('./bloques.json');

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

describe('controllers/bloqueController', () => {

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

  describe('POST /api/bloque/:id', () => {
    it('should return the bloque was updated', (done) => {

      const options = {
        url: `${base}/api/bloque/1`,
        body: {
          id: 1,
          num_bloque: 5,
          asignado: true
        },
      };
      const obj = bloquesFake.update.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'num_bloque', 'asignado'
        );

        body.data.id.should.eql(1);
        body.data.num_bloque.should.eql(5);
        body.data.asignado.should.eql(true);

        done();
      });
    });

    it('should throw an error if the bloque does not exist', (done) => {
      const options = {
        body: { num_bloque: 10 },
        json: true,
        url: `${base}/api/bloque/999`
      };
      const obj = bloquesFake.update.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      axios.put(options, (err, res, body) => {
        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('That bloque does not exist.');
        done();
      });
    });
  });

})
