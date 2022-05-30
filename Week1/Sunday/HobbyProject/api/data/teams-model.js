const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    address: String,
});

const teamSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    year: Number,
    teamMembers: [teamMemberSchema]
});

module.exports = mongoose.model(process.env.DB_CICLING_COLLECTION ,teamSchema);
