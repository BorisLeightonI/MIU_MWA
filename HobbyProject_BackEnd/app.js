require('dotenv').config();
require('./model/connect.model');

const express = require('express');
const app = express();
const router = require('./routes/router');

app.set('PORT', process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
    res.header(process.env.ALLOW_ORIGIN, process.env.ALLOW_ORIGIN_URL);
    res.header(process.env.ALLOW_ORIGIN_HEADERS, process.env.HEADERS);
    res.header(process.env.ALLOW_ORIGIN_METHODS, process.env.METHODS);
    next();
});

app.use(router);
const server = app.listen(app.get('PORT'), console.log('Running on Port', app.get('PORT')));