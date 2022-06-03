const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    gpa: {
        type:Number,
        required:true,
        min:0,
        max:4,
    }
});
console.log('from Student model, db collection:',process.env.DB_COLLECTION)

module.exports = mongoose.model(process.env.DB_COLLECTION, studentSchema, process.env.DB_COLLECTION);