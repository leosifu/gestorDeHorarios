const express = require('express');
const Router = express.Router;
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });
const router = new Router();
const ProfesorC = require('./profesor')

router.post('/profesores', upload.single('file'), function (req, res) {
  // console.log(req.body);
  var campos = req.body[1]
  var profesores = req.body.slice(2, req.body.length-1)
  const CampoProfesor = profesores.map((profesor, n)=>{
    return({
      name: profesor[1],
      rut: profesor[2],
      email: profesor[3],
    })
  })
  console.log(CampoProfesor);
  ProfesorC.create(CampoProfesor)
});

module.exports = router
