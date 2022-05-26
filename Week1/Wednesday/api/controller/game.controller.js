const gamesData = require('../data/games.json');

module.exports.getAll = function(req,res){
    console.log('JSON received');
    let count = 5;
    let offset = 0;
    if(Object.keys(req.query)>0 && req.query.count) count = parseInt(req.query.count);
    if(Object.keys(req.query)>0 && req.query.offset) offset = parseInt(req.query.offset);

    const pageGames = gamesData.slice(offset, offset+count);
    res.status(200).json(pageGames);
}

module.exports.getOne = function(req,res){
    console.log('JSON received');
    const index = req.params.x;
    res.status(200).json(gamesData[index]);
}