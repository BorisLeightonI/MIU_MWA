const schoolData = require('../data/school.json');

module.exports.getAllStudents = function(req,res){
    res.status(200).json(schoolData);
}

module.exports.getOneStudent = function(req,res){
    const index = req.params.id;
    res.status(200).json(schoolData[index]);
}