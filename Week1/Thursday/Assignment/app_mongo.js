require('./api/data/dbconnection').open();
require('dotenv').config();
let port = process.env.PORT;

const express = require('express');
const app = express();
const router = require('./api/route/route');


app.use(express.static('public'));

app.use(router);

app.listen(port, console.log('Server running on port:',port));