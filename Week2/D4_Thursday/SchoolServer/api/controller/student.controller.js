const { mongoose } = require("mongoose");

const Student = mongoose.model(process.env.DB_COLLECTION);
console.log('Collection: ',Student.collection.collectionName);

const _getStudents = (students,res)=>{
    console.log('Found ',students?students.length:0,' students');
    console.log(students);
    res.json(students);
}
const _errStudentMessage = (err, res)=>{
    console.log('Error finding Students');
    console.log(err);
    res.status(500).json(err);
}


module.exports.getAll = (req,res)=>{
    Student.find().exec()
           .then((students)=>_getStudents(students,res))
           .catch((err)=>_errStudentMessage(err,res));
}

module.exports.getOne = (req,res)=>{
    if(req.params.id){
        let id = req.params.id;
        Student.findById(id).exec()
                .then((students)=>_getStudents(students,res))
                .catch((err)=>_errStudentMessage(err,res));
    }
}



module.exports.addOne = async (req,res)=>{
    const student = await Student.create({
        name: req.body.name,
        gpa: req.body.gpa
    });
    try {
        const newStudent = await student.save();
        res.json(newStudent);
    } catch (error) {
        res.json(error);
    } 
}

module.exports.editOne = async (req,res)=>{
    if(req.params.id){
        let id = req.params.id;
        const student = await Student.findById(id);
        
        if(req.body.name) student.name = req.body.name;
        if(req.body.gpa) student.gpa = req.body.gpa;

        req.status(204).json(student);

    }else{
        res.end('Not Found');
    }
}

module.exports.deleteOne = (req,res)=>{
    if(req.params.id){
        let id = req.params.id;
        Student.findByIdAndDelete(id).exec()
                .then((student)=>_getStudents(student,res))
                .catch((err)=>_errStudentMessage(err,res));
    }
}