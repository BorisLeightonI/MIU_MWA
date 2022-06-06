const { response } = require('express');
const { mongoose } = require('mongoose');

const Game = mongoose.model(process.env.DB_GAMES_COLLECTION);


module.exports.getAll = (req,res)=>{
    let offset = parseInt(process.env.DEFAULT_OFFSET);
    let count = parseInt(process.env.DEFAULT_COUNT);
    const maxCount = process.env.DEFAULT_MAX_FIND;

    if(Object.keys(req.query).length>0 && req.query.offset) offset = parseInt(req.query.offset); 
    if(Object.keys(req.query).length>0 && req.query.count) count = parseInt(req.query.count); 
    if(isNaN(offset)||isNaN(count)) {
        res.status(400).json({"message": "QueryString Offset and Count should be numbers"});
        return;
    }
    if(count > maxCount){
        res.status(400).json({"message": "Can not exceed count of "+maxCount});
        return;
    }

    Game.find()
        .skip(offset)
        .limit(count)
        .exec(function(err,games){
            if(err){
                console.log('Error finding Games');
                res.status(500).json(err);
            }else{
                console.log(`Found ${games.length} Games`);
                res.status(200).json(games);
            }
        });
}

module.exports.getOne = function(req,res){
    const gameId = req.params.gameId;
    console.log('Entering getOne controller, gameId:', gameId);
    Game.findById(gameId).exec(function(err,game){
        const response = {
            status: 200,
            message: game
        }
        if(err){
            console.log('Error finding game');
            // res.status(500).json(err);
            response.status = 500;
            response.message = err;
        }else if(!game){
            console.log('Game id not found');
            // res.status(404).json({"message":"Game ID not found"});
            response.status = 404;
            response.message = {"message":"Game Id not found"};
        }/* else{
            console.log('Found game', game);
            res.status(200).json(game);
        } */
        res.status(response.status).json(response.message);
    });
}

module.exports.addOne = function(req,res){
    console.log('Game AddOne request');
    const newGame = {
        title : req.body.title,
        year : req.body.year,
        rate : req.body.rate,
        price : parseFloat(req.body.price),
        minPlayers : req.body.minPlayers,
        maxPlayers : req.body.maxPlayers,
        publisher : {"name": "NoName"},
        reviews : [],
        minAge : req.body.minAge,
        designers : [req.body.designers]

    };
    if(req.body.title && req.body.price){
        Game.create(newGame, function(err,game){
            const response = {status: 201, message: game}
            if(err){
                // res.status(500).json({error:err});
                console.log('error creating game');
                response.status = 500;
                response.message = err;
            }
                console.log('Game created');
                res.status(response.status).json(response);
            
        })
    }
}

const _updateOne = function(req,res,updateGameCallback){
    const gameId = req.params.gameId;
    console.log('Entering updateOne game-controller, gameId:', gameId);
    Game.findById(gameId).exec(function(err,game){
        const response = {
            status: 204,
            message: game
        }
        if(err){
            console.log('Error finding game');
            response.status = 500;
            response.message = err;
        }else if(!game){
            console.log('Game id not found');
            response.status = 404;
            response.message = {"message":"Game Id not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }else{
            updateGameCallback(req,res,game,response);
        }
    });
}

module.exports.fullUpdateOne = function(req,res){
    console.log('Game fullupdate one game - controller');
    gameUpdate = function(req,res,game,response){
        
        game.title = req.body.title;
        game.year = req.body.year;
        game.rate = req.body.rate;
        game.price = parseFloat(req.body.price);
        game.minPlayers = req.body.minPlayers;
        game.maxPlayers = req.body.maxPlayers;
        game.publisher = {"name": "NoName"};
        game.reviews = [];
        game.minAge = req.body.minAge;
        game.designers = [req.body.designers];

        if(req.body.name){
            console.log('Named passed');
            game.publisher = {name: req.body.name};
        }else{
            console.log('No Name passed');
            game.publisher = {name: "NoName"};
        }
        game.save(function(err, updatedGame){
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
        });
    }
    _updateOne(req,res,gameUpdate);
}

module.exports.partialUpdateOne = function(req,res){
    console.log('Full update one game controller');
    gameUpdate = function(req,res,game,response){
        if(req.body.title) game.title = req.body.title;
        if(req.body.year) game.year = req.body.year;
        if(req.body.rate) game.rate = req.body.rate;
        if(req.body.price) game.price = parseFloat(req.body.price);
        if(req.body.minPlayers) game.minPlayers = req.body.minPlayers;
        if(req.body.maxPlayers) game.maxPlayers = req.body.maxPlayers;
        if(req.body.name) game.publisher = {name: req.body.name};
        if(req.body.publisher) game.reviews = req.body.reviews;
        if(req.body.minAge) game.minAge = req.body.minAge;
        if(req.body.designers) game.designers = [req.body.designers];

        game.save(function(err, updatedGame){
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
        });
    }
    _updateOne(req,res,gameUpdate);
}

module.exports.deleteOne = function(res,res){
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function(err,deletedGame){
        const response = {status: 204, message:deletedGame};
        if(err){
            console.log('Error finding game');
            response.status = 500;
            response.message = err;
        }else if(!deletedGame){
            console.log('Game id not found');
            response.status = 500;
            response.message = 'Game id not found';
        }
        res.status(response.status).json(response.message);
    });
}