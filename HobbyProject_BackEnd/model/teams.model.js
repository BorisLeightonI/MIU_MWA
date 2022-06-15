const mongoose = require('mongoose');
const teamMembersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type:String,
        required: true
    },
    country:{
        type: String,
        required: true,
    },
    contactName:{
        type: String,
        required: true,
    },
    contactTelephone: {
        type: String,
        required: true,
    }
});
const teamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    distance: {
        type: Number,
        min: 1,
        max: 10,
        required: true,
    },
    teamMembers: [ teamMembersSchema ]
});

module.exports = mongoose.model(
    process.env.DB_NAME, 
    teamSchema, 
    process.env.COLLECTION_NAME
);