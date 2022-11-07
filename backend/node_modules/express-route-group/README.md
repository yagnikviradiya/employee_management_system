# express-route-group

This package enables express users to create a seperate file for their routes, and group routes by prefix.

# Installation

This is a node module and is available for install through npm
```
npm install express-route-group
```

# Usage
### index.js - Basic express configuration
Here, you create a basic express configuration then calling the function ```registerRoutes``` from routes.js (example below).  
We pass the application instance returned from calling ```express()``` here.
```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Registers routes for your application
const {registerRoutes} = require('./routes');
registerRoutes(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, function(){
  console.log(`Server starting on port ${PORT}`);
})
```

### routes.js
You may declare your route groups with these functions:
```
app.use(prefix, routes_arr)
```
```
app.use(prefix, middlewares_arr, routes_arr)
```  

And to register the routes inside a route group, you can use these functions: 
```
Route.get(endpoint, callback)
```
```
Route.post(endpoint, callback)
```
```
Route.put(endpoint, callback)
```
```
Route.patch(endpoint, callback)
```
```
Route.delete(endpoint, callback)
```

Example : 
```javascript
const Route = require('express-route-group');

module.exports.registerRoutes = function(app) {
/*
  * Register your routes here
  * app.use(prefix, routes_arr)
  * app.use(prefix, middlewares_arr, routes_arr)
  */
app.use('/test',
  Route.routes([
      Route.get('/helloworld', async (req, res, next) => {
        res.send({ 'message': 'Hello World!' });
      })
  ]));
}
```
Try starting the webserver then go to localhost:8081/test/helloworld, you should see the JSON returned.


### Registering Multiple Routes & Route Groups (routes.js)
```javascript
const Route = require('express-route-group');

module.exports.registerRoutes = function(app) {
  app.use('/test',
    Route.routes([
        Route.get('/helloworld', async (req, res, next) => {
          res.send({ 'message': 'Hello World!' });
        })
    ]));

  app.use('/secondgroup',
    Route.routes([
        Route.get('/helloworld', async (req, res, next) => {
          res.send({ 'message': 'Hello World!' });
        }),
        Route.get('/helloworldagain', async (req, res, next) => {
          res.send({ 'message': 'Hello World Again!' });
        })
    ]));
}
```