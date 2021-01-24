const app = require('./index')
const http = require('http');

var models = require("./models")
models.sequelize.sync().then(function(){
    console.log("Conecta2");
}).catch(function(error){
  console.log(error);
  console.log("Problemas al conectar con la DB");
})
require('./routes')(app)
// Setup a default catch-all route that sends back a welcome message in JSON format.

app.get('/loaderio-70c73b14f16459b34ea12d239c03846b', (req, res, next) => {
  res.sendFile(__dirname + '/loaderio-70c73b14f16459b34ea12d239c03846b.txt')
})

app.get('*', (req, res) => res.status(200).send({
message: 'Welcome to the beginning of nothingness.',
}));


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

module.exports = server;
