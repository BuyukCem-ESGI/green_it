const cors = require('cors');
const http = require('http');
const xss = require('xss-clean');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const fragilite = require('./Controller/fragilite.Controller');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(cors());

app.post('/', function (req, res) {
  const city = req.body.city;
  if(city == null || city.length === 0){
    res.render('views/index', { error: 'City is not valid'});
  }
  res.render('views/index', fragilite.fragilite(city));
});

app.get('/', function (req, res) {
  res.render('views/index', );
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
  console.log(`Listening on ${bind} 🚀`);
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
