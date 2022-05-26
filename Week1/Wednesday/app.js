const express = require('express');
const router = require('./api/route');
require('dotenv').config();

const app = express();
app.set('port', process.env.PORT);
app.use(express.static('public'));
app.use(router);

const server = app.listen(app.get('port'), console.log('Running on port:', app.get('port')));