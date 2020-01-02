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
  // console.log(req.body);
  var profesores = req.body.slice(2, req.body.length-1)
  console.log(profesores);
  const CampoProfesor = profesores.map((profesor, n)=>{
    console.log('asd');
    return({
      id: profesor[0],
      name: profesor[1],
      rut: profesor[2],
      email: profesor[3],
    })
  })
  console.log('profesoresData', CampoProfesor);
  // ProfesorC.create(CampoProfesor)
});

module.exports = router
