const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const {API_VERSION} = require('./config');
//const {model} = require('mongoose');

//load routing
const branchRoutes = require("./routers/branch");
const productRoutes = require("./routers/product");
const inventoryRoutes = require("./routers/inventory");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Configure HTTP Header - Esta configuración reemplaza al plugin de CORS del navegador
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });


//Basic Router
app.use(`/api/${API_VERSION}`, branchRoutes);
app.use(`/api/${API_VERSION}`, productRoutes);
app.use(`/api/${API_VERSION}`, inventoryRoutes);

module.exports = app;