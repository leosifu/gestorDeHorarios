const app = require('../../../../index.js')
const jwt = require('jsonwebtoken');
const usuariosFake = require('./usuarios.json');

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

  describe('POST /api/login', () => {
    it('should return user if has token and is in database', (done) => {
      const obj = usuariosFake.login.successFind;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/login`, (err, res, body) => {
        res.statusCode.should.eql(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.should.include.keys(
          'id', 'email', 'name', 'lastName', 'rut', 'roles'
        );
        body.data.id.should.eql(1);
        body.data.email.should.eql('pruebaFind@usach.cl');
        body.data.name.should.eql('prueba');
        body.data.lastName.should.eql('Find');
        body.data.rut.should.eql('11.111.111-1');

        body.data.roles.length.should.eql(1);
        body.data.roles[0].should.eql('admin');
        done();
      });
    });

    it('should return user if has token and is not in database', (done) => {
      const obj = usuariosFake.login.successNotFind;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/login`, (err, res, body) => {
        res.statusCode.should.eql(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.should.include.keys(
          'id', 'email', 'name', 'roles'
        );
        body.data.id.should.eql(2);
        body.data.email.should.eql('pruebaNotFind@usach.cl');
        body.data.name.should.eql('pruebaNotFind');

        body.data.roles.length.should.eql(0);
        done();
      });
    });

    it('should return error user if has not token', (done) => {
      const obj = usuariosFake.login.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/login`, (err, res, body) => {

        res.statusCode.should.equal(401);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Invalid user.');
        done();
      });
    });
  });

  describe('GET /api/getUsuarios', () => {
    it('should return users if is authorized', (done) => {
      const obj = usuariosFake.getUsuarios.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/getUsuarios`, (err, res, body) => {
        res.statusCode.should.eql(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.length.should.eql(3);

        body.data[0].should.include.keys(
          'id', 'email', 'name', 'lastName', 'rut', 'roles'
        );
        body.data[0].id.should.eql(1);
        body.data[0].email.should.eql('pruebaFind1@usach.cl');
        body.data[0].name.should.eql('prueba1');
        body.data[0].lastName.should.eql('Find1');
        body.data[0].rut.should.eql('11.111.111-1');

        body.data[0].roles.length.should.eql(1);
        body.data[0].roles[0].should.eql('coord');
        done();
      });
    });

    it('should return error user if user is not authorized', (done) => {
      const obj = usuariosFake.getUsuarios.failure;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/getUsuarios`, (err, res, body) => {

        res.statusCode.should.equal(401);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Unauthorized user.');
        done();
      });
    });
  });

  describe('GET /api/getProfesores/:procesoId', () => {
    it('should return users if is authorized and proceso exists', (done) => {
      const obj = usuariosFake.getProfesores.success;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/getProfesores/1`, (err, res, body) => {
        res.statusCode.should.eql(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.length.should.eql(3);

        body.data[0].should.include.keys(
          'id', 'email', 'name', 'lastName', 'rut', 'roles'
        );
        body.data[0].id.should.eql(4);
        body.data[0].email.should.eql('pruebaFind4@usach.cl');
        body.data[0].name.should.eql('prueba4');
        body.data[0].lastName.should.eql('Find4');
        body.data[0].rut.should.eql('11.111.444-1');

        body.data[0].roles.length.should.eql(1);
        body.data[0].roles[0].should.eql('profe');
        done();
      });
    });

    it('should return error user if user is not authorized', (done) => {
      const obj = usuariosFake.getProfesores.failureUser;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/getProfesores/1`, (err, res, body) => {

        res.statusCode.should.equal(401);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Unauthorized user.');
        done();
      });
    });

    it('should return error user if proceso does not exist', (done) => {
      const obj = usuariosFake.getProfesores.failureProceso;
      this.get.yields(null, obj.res, JSON.stringify(obj.body));
      axios.get(`${base}/api/getProfesores/1`, (err, res, body) => {

        res.statusCode.should.equal(404);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Proceso does not exist.');
        done();
      });
    });
  });

  describe('POST /api/addUsuario', () => {
    it('should return the usuario that was added', (done) => {

      const options = {
        url: `${base}/api/createUsuario`,
        body: {
          id: 7,
          email: "pruebaFind7@usach.cl",
          name: "prueba7",
          lastName: "Find7",
          rut: "11.111.777-1",
          roles: ["profe"]
        },
      };
      const obj = usuariosFake.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'email', 'name', 'lastName', 'rut', 'roles'
        );
        body.data.id.should.eql(7);
        body.data.email.should.eql('pruebaFind7@usach.cl');
        body.data.name.should.eql('prueba7');
        body.data.lastName.should.eql('Find7');
        body.data.rut.should.eql('11.111.777-1');

        body.data.roles.length.should.eql(1);
        body.data.roles[0].should.eql('profe');
        done();
      });
    });

    it('should throw an error if the payload is malformed', (done) => {
      const options = {
        json: true,
        url: `${base}/api/createUsuario`,
        body: {
          id: 7,
          email: "pruebaFind7@usach.cl",
          name: "prueba7",
          lastName: "Find7"
        },
      };
      const obj = usuariosFake.add.failure;
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

  describe('PUT /api/editUsuario', () => {
    it('should return the usuario that was updated', (done) => {

      const options = {
        url: `${base}/api/editUsuario/7`,
        body: {
          roles: ["profe", "coord"]
        },
      };
      const obj = usuariosFake.update.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      axios.post(options, (err, res, body) => {
        res.statusCode.should.equal(201);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');

        body.data.should.include.keys(
          'id', 'email', 'name', 'lastName', 'rut', 'roles'
        );
        body.data.id.should.eql(7);
        body.data.email.should.eql('pruebaFind7@usach.cl');
        body.data.name.should.eql('prueba7');
        body.data.lastName.should.eql('Find7');
        body.data.rut.should.eql('11.111.777-1');

        body.data.roles.length.should.eql(2);
        body.data.roles[1].should.eql('coord');
        done();
      });
    });

    it('should throw an error if the usuario does not exist', (done) => {
      const options = {
        json: true,
        url: `${base}/api/editUsuario/999`,
        body: {
          roles: ["profe", "coord"]
        },
      };
      const obj = usuariosFake.update.failure;
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

})
