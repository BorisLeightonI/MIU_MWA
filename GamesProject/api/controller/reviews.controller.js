const mongoose = require('mongoose');
const Game = mongoose.model(process.env.DB_GAMES_COLLECTION);

const getAll = function(req,res){
    console.log('GET Reviews Controller');
    const gameId = req.params.gameId; 
    //.select('reviews') after findById
    Game.findById(gameId).exec(function(err, game){
        if(err){
            console.log(err);
            res.json(err);
        }else{
            console.log('Found reviews', game.reviews, 'for Game ', game);
            res.status(200).json(game);
        }
    });
}
const getOne = function(req,res){
    console.log('GET One Review Controller');
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select('reviews').exec(function(err, game){
        console.log('Found review', game.reviews.id(reviewId), 'for Game ', game);
        res.status(200).json(game.reviews.id(reviewId));
    });
}
module.exports = {
    getAll,
    getOne
}