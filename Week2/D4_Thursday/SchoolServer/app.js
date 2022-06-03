require('dotenv').config();
require('./api/model/connect');
const express = require('express');
const app = express();
const router = require('./api/route/router');

app.set('port', process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(app.get('port'), console.log('Server running on port ', app.get('port')));
