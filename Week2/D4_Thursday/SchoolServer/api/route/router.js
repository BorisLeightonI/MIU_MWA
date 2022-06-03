const express = require('express');
const { getAll, addOne, deleteOne, editOne, getOne } = require('../controller/student.controller');

const router = express.Router();

router.route('/')
        .get(getAll)
        .post(addOne);

router.route('/:id')
      .get(getOne)
      .patch(editOne)
      .delete(deleteOne);

module.exports = router;