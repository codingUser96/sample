var config = require('./config/config.js');
var express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

config.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Length, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

// Routes
  const userRouter = require('./api/user');
  app.use('/user',userRouter);
  const productRouter = require('./api/product');
  app.use('/product',productRouter);

// To start server
  app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });