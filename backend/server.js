const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const employeeRoutes=require("./router/route");
const mongodbConnection = require('./config/db');

// create express app
const app = express();
app.use(cors());
// Setup server port
const port = process.env.PORT || 3000;
// parse requests of content-type - application/x-www-form-urlencoded      
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// define a root as employeeRoutes route
app.use('/',employeeRoutes)
// connect to the mongo database
mongodbConnection();
//  for get the image
app.use('/images', express.static('./public/uploads'));

// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});

