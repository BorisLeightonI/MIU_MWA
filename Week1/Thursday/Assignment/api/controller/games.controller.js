const dbconnection = require('../data/dbconnection');
const db = dbconnection.get();


module.exports.getAll = (req,res)=>{
    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION);
    gamesCollection.find().toArray((err,games)=>{
        if(err) return console.log(err);
        res.status(200).json(games);
    });
}

module.exports.testDB = (req,res)=>{
    res.status(200).json(db);
}
// module.exports = getAll;