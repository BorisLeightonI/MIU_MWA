const mongoose = require('mongoose');
require('./Student');

const url = process.env.URL_DB+process.env.DB_NAME;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const con = mongoose.connection;

con.on('connected',()=>{
    console.log('Mongoose connected to ',process.env.DB_NAME);
});
con.on('disconnected',()=>{
    console.log('Mongoose disconnected to ');
});

con.on('error',(err)=>{
    console.log('Mongoose Error ',err);
});
process.on('SIGINT', ()=>{
    con.close(()=>{
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});
process.on('SIGTERM', ()=>{
    con.close(()=>{
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});
