
global.APP_ROOT_PATH = __dirname + '/app/';

require('./config/global-paths');

global.config = require('./config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require(APP_ROUTE_PATH);

app.use(bodyParser.json());

app.use('/', routes);

app.listen(global.config.server.PORT, function(){
    console.log('Api server is running on port: ' + global.config.server.PORT);
});
