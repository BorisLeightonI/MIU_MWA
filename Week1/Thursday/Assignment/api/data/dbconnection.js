const { MongoClient } = require('mongodb');
require('dotenv').config();

// const MongoClient = require('mongodb').MongoClient;
let _connection = null;

const open = ()=>{
    if(get()==null){
        MongoClient.connect(process.env.DB_URL, function(err, client){
            if(err) return console.log('DB Connection error', err);
            
            
            _connection = client.db(process.env.DB_NAME);
            console.log('connected to DB: ',_connection);
            console.log(_connection.collection('games'));
        });
    }
}

function get(){
    return _connection;
}

module.exports = {
    get,
    open
}