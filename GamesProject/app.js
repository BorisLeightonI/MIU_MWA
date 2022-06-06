require('dotenv').config();

require('./api/data/db');
const express = require('express');
const app = express();
const router = require('./api/route/route');

app.set('port', process.env.PORT);

app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    next();
});

app.use(router);

app.listen(app.get('port'), console.log('Server running on port:',app.get('port')));