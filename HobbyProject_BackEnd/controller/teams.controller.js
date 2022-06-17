const { default: mongoose } = require("mongoose");
const offsetAndCount = require("./teams-paginator/offsetAndCount");
const Teams = mongoose.model(process.env.DB_NAME);


module.exports.index = (req,res)=>{
    res.end('controller works');
}

module.exports.getAll = (req,res)=>{
    const {offset, count} = offsetAndCount(req,res);
    console.log('offset and count: ', offset, count);
    Teams.find()
        .skip(offset)
        .limit(count)
        .exec()
        .then(teams=>_getTeams(teams,res))
        .catch(err=>_errTeamsMessage(err,res));
}
module.exports.getOne = (req,res)=>{
    if(req.params.id){
        let id = req.params.id;
        Teams.findById(id).exec()
                .then(teams=>_getTeams(teams,res))
                .catch(err=>_errStudentMessage(err,res));
    }
}

module.exports.addOne = (req,res)=>{
    console.log('AddOne: ', req.body);
    console.log('AddOne body entries: ', Object.entries(req.body));
const newTeam = {
    name:req.body.name,
    country: req.body.country,
    date: req.body.date,
    distance:req.body.distance,
    teamMembers: req.body.teamMembers
}
if(newTeam.name&&newTeam.country&&newTeam.date&&newTeam.distance&&newTeam.teamMembers){
    Teams.create(newTeam)
            .then(teams=>_getTeams(teams,res))
            .catch(err=>_errTeamsMessage(err,res));
            // res.json({newTeam});
}else{
    res.status(500).json(
        {
            "message":"Can not be created with this object",
            newTeam
        }
    );
}
}

module.exports.editOne = (req,res)=>{
    if(req.params.id){
        let id = req.params.id;
        console.log('EditOne Id:', id);
        let _team = {};
        if(req.body.name) _team.name = req.body.name;
        if(req.body.country) _team.country = req.body.country;
        if(req.body.date) _team.date = req.body.date;
        if(req.body.distance) _team.distance = req.body.distance;
        if(req.body.teamMembers) _team.teamMembers = req.body.teamMembers;
        
        Teams.findByIdAndUpdate(id, _team).exec()
             .then(team => _getTeams(team,res))
             .catch(err => _errTeamsMessage(err, res));
        
    }else{
        res.end('Not Found');
    }
}

module.exports.deleteOne = (req,res)=>{
    if(req.params.id){
        let id = req.params.id;
        Teams.findByIdAndDelete(id).exec()
                .then((team)=>_getTeams(team,res))
                .catch((err)=>_errTeamMessage(err,res));
    }else{
        res.end('Not Found');
    }
}

const _getTeams = (teams,res)=>{
    console.log('Found ',teams?teams.length:0,' teams');
    res.json(teams);
}
const _errTeamsMessage = (err, res)=>{
    console.log('Error finding teams');
    res.status(500).json(err);
}
