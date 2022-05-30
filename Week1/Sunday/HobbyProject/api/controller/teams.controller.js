const { mongoose } = require('mongoose');

const CiclingRace = mongoose.model(process.env.DB_CICLING_COLLECTION);


module.exports.getAll = (req,res)=>{
    let offset = process.env.DEFAULT_OFFSET;
    let count = process.env.DEFAULT_COUNT;
    const maxCount = process.env.DEFAULT_MAX_FIND;
    console.log('Defaults: offset, count, maxCount -> ', offset,count,maxCount);
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

    CiclingRace.find()
        // .skip(offset)
        .limit(count)
        .exec(function(err,ciclingRaces){
            if(err){
                console.log('Error finding CiclingRaces');
                res.status(500).json(err);
            }else{
                console.log(`Found ${ciclingRaces.length} CiclingRaces`);
                res.status(200).json(ciclingRaces);
            }
        });
}

module.exports.getOne = function(req,res){
    const ciclingRaceId = req.params.ciclingRaceId;
    console.log('Entering getOne teams-controller, ciclingRaceId:', ciclingRaceId);
    CiclingRace.findById(ciclingRaceId)
               .exec(function(err,ciclingRace){
        const response = {
            status: 200,
            message: ciclingRace
        }
        if(err){
            console.log('Error finding ciclingRace');
            response.status = 500;
            response.message = err;
        }else if(!ciclingRace){
            console.log('CiclingRace id not found');
            response.status = 404;
            response.message = {"message":"CiclingRace Id not found"};
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.addOne = function(req,res){
    console.log('CiclingRace AddOne request');
    const newCiclingRace = {
        name : req.body.name,
        year : req.body.year,
        teamMembers: req.body.teamMembers
    };

    if(req.body.name){
        CiclingRace.create(newCiclingRace, function(err,ciclingRace){
            const response = {status: 201, message: ciclingRace}
            if(err){
                console.log('error creating ciclingRace');
                response.status = 500;
                response.message = err;
            }
            console.log('CiclingRace created');
            res.status(response.status).json(response);            
        });
    }
}

const _updateOne = function(req,res,updateCiclingRaceCallback){
    const ciclingRaceId = req.params.ciclingRaceId;
    console.log('Entering updateOne ciclingRace-controller, ciclingRaceId:', ciclingRaceId);
    CiclingRace.findById(ciclingRaceId).exec(function(err,ciclingRace){
        const response = {
            status: 204,
            message: ciclingRace
        }
        if(err){
            console.log('Error finding ciclingRace');
            response.status = 500;
            response.message = err;
        }else if(!ciclingRace){
            console.log('CiclingRace id not found');
            response.status = 404;
            response.message = {"message":"CiclingRace Id not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }else{
            updateCiclingRaceCallback(req,res,ciclingRace,response);
        }
    });
}

module.exports.fullUpdateOne = function(req,res){
    console.log('CiclingRace fullupdate one ciclingRace - controller');
    ciclingRaceUpdate = function(req,res,ciclingRace,response){
        
        ciclingRace.name = req.body.name;
        ciclingRace.year = req.body.year;
        ciclingRace.teamMembers = [];

        ciclingRace.save(function(err, updatedCiclingRace){
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
        });
    }
    _updateOne(req,res,ciclingRaceUpdate);
}

module.exports.partialUpdateOne = function(req,res){
    console.log('Partial update one ciclingRace controller');
    ciclingRaceUpdate = function(req,res,ciclingRace,response){
        if(req.body.name) ciclingRace.name = req.body.name;
        if(req.body.year) ciclingRace.year = req.body.year;
        ciclingRace.teamMembers = [];

        ciclingRace.save(function(err, updatedCiclingRace){
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
        });
    }
    _updateOne(req,res,ciclingRaceUpdate);
}

module.exports.deleteOne = function(res,res){
    const ciclingRaceId = req.params.ciclingRaceId;

    CiclingRace.findByIdAndDelete(ciclingRaceId)
               .exec(function(err,deletedCiclingRace){

        const response = {status: 204, message:deletedCiclingRace};

        if(err){
            console.log('Error finding ciclingRace');
            response.status = 500;
            response.message = err;
        }else if(!deletedCiclingRace){
            console.log('CiclingRace id not found');
            response.status = 500;
            response.message = 'CiclingRace id not found';
        }

        res.status(response.status).json(response.message);
    });
}