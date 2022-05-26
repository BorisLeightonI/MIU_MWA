const express = require('express');
const { getAll, getOne } = require('../controller/game.controller');
const { getAllStudents, getOneStudent } = require('../controller/schoolController');
const router = express.Router();

router.route('/').get(
 (req,res)=>{
    res.render('index');
 });

 router.get('/all', getAll);
 router.get('/one/:id', getOne);

 router.get('/num/:num', (req,res)=>{
     let number = req.params.num;
     let qNum = 1;
     console.log('from path -> number:', number);
     if(Object.keys(req.query).length > 0) console.log(req.query); qNum = req.query.number;
     res.write(`Multiplication of ${number} and ${qNum} is: ${number*qNum}`);
     res.end(); /*is it neccesary? */
 });

 router.get('/api/students', getAllStudents);
 router.get('/api/student/:id', getOneStudent);

 module.exports = router;