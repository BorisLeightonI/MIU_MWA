const express = require('express');
const { test, index, testJson } = require('../controller/index.controller');
const { getOne, getAll, addOne, fullUpdateOne, partialUpdateOne, deleteOne } = require('../controller/games.controller');
const publisher = require('../controller/publisher.controller');
const review = require('../controller/reviews.controller');

const router = express.Router();

router.route('/').get(index);
router.route('/test').get(test)
router.route('/testJson').get(testJson);

router.route('/games')
        .get(getAll)
        .post(addOne);     
router.route('/games/:gameId')
        .get(getOne)
        .put(fullUpdateOne)
        .patch(partialUpdateOne)
        .delete(deleteOne);

router.route('/games/:gameId/publisher')
        .get(publisher.getOne)
        .post(publisher.addOne)
        .put(publisher.fullUpdateOne)
        .patch(publisher.partialUpdateOne);

router.route('/games/:gameId/review')
.get(review.getAll);
router.route('/games/:gameId/review/:reviewId')
.get(review.getOne);



module.exports = router;