const { default: mongoose } = require("mongoose");
const User = require("../model/users.model");
const JWT = require('jsonwebtoken');
// const User = mongoose.model(process.env.MODEL_USER);


module.exports.register = (req,res)=>{
    let userData = req.body;
    User.create(userData)
        .then(user => _getUser(user,res))
        .catch(err => _errUserMessage(err,res));
}

module.exports.login = (req,res)=>{
    let userData = req.body;
    User.findOne({email: userData.email})
        .then(user => _getUserAndCheckPassword(user,res, userData))
        .catch(err => _errUserMessage(err,res));
}

const _getUser = (user,res)=>{
    console.log('Found ',user?user.length:0,' user');
    let payload = { subject: user._id};
    let token = JWT.sign(payload, 'secretKey');
    // res.status(200).json(user);
    res.status(200).json(token);
}
const _getUserAndCheckPassword = (user,res, userData)=>{
    if(!user){
        res.status(401).json({"message":"'Invalid email'"});
    } else
    if(user.password !== userData.password){
        res.status(401).json({"message":"'Invalid password'"});
    }else{
        // res.status(200).json(user);
        let payload = { subject: user._id};
        let token = JWT.sign(payload, 'secretKey');
        res.status(200).json(token);
    }
}

const _errUserMessage = (err, res)=>{
    console.log('Error finding user');
    res.status(500).json(err);
}

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).json({"message": "Unaouthorized request"});
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).json({"message": "Unaouthorized request"});
    }
    let payload = JWT.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).json({"message": "Unaouthorized request"});
    }
    req.userId = payload.subject;
    next();
}