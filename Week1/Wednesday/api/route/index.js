const express = require('express');
const { getAll, getOne } = require('../controller/game.controller');
const { procNum } = require('../controller/num.controller');
const { getAllStudents, getOneStudent } = require('../controller/schoolController');
const router = express.Router();

router.route('/').get(
 (req,res)=>{
    res.render('index');
 });

 router.get('/all', getAll);
 router.get('/one/:id', getOne);

 router.get('/num/:num', procNum);

 router.get('/api/students', getAllStudents);
 router.get('/api/student/:id', getOneStudent);

 module.exports = router;