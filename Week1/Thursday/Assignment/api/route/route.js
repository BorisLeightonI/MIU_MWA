const express = require('express');
const { getAll, testDB } = require('../controller/games.controller');
const router = express.Router();

router.route('/').get((req,res)=>{
    res.render('index.html');
});
router.route('/all').get(getAll);
router.route('/testDB').get(testDB);



module.exports = router;