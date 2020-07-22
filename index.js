const express = require('express'); 
const bodyParser = require('body-parser'); 
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes.js');
const clients = require('./clients/clientMap.js');
const fileUpload = require('express-fileupload');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const config = require('./config.json');
const app = express(); 

// Off the shelf Middleware for express. 
// parses incoming JSON. 
app.use(bodyParser.json());

// Helps express host a swagger documentation page. 
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//console.log(JSON.stringify(swaggerDocument)); 

//app.get("/swagger.yaml", (req,res) =>  res.status(200).json(swaggerDocument)); 

// custom middleware to make my life easier.
// sets up clients we will need. 
clients({app, config});

// sets up the routes we will need. 
routes({app, config});

app.listen (config.port, () => {
    console.log(`hello there, I am listening on ${app.selfUrl}`);
    console.log(`swagger page available at ${app.selfUrl}/swagger`);
}); 