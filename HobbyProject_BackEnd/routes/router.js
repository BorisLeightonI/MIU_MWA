const express = require('express');
const { index, getAll, getOne, addOne, editOne, deleteOne } = require('../controller/teams.controller');
const router = express.Router();

router.route('/').get(index);

router.route('/all')
            .get(getAll)
            .post(addOne);

router.route('/all/:id')
            .get(getOne)
            .put(editOne)
            .delete(deleteOne);

module.exports = router;