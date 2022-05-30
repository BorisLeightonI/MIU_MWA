const express = require('express');
const { test, index, testJson } = require('../controller/index.controller');
const { getOne, getAll, addOne, fullUpdateOne, partialUpdateOne, deleteOne } = require('../controller/teams.controller');

const router = express.Router();

router.route('/').get(index);
router.route('/test').get(test)
router.route('/testJson').get(testJson);

router.route('/ciclingRaces')
        .get(getAll)
        .post(addOne);     
router.route('/ciclingRace/:ciclingRaceId')
        .get(getOne)
        .put(fullUpdateOne)
        .patch(partialUpdateOne)
        .delete(deleteOne);

module.exports = router;