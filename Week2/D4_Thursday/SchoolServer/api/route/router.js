const express = require('express');
const { getAll, addOne } = require('../controller/student.controller');
const router = express.Router();

router.route('/')
        .get(getAll)
        .post(addOne);

module.exports = router;