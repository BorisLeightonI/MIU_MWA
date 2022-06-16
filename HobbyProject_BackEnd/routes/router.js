const express = require('express');
const { index, getAll, getOne, addOne, editOne, deleteOne } = require('../controller/teams.controller');
const { register, login } = require('../controller/users.controller');
const router = express.Router();

router.route('/').get(index);

router.route('/all')
            .get(getAll)
            .post(addOne);

router.route('/all/:id')
            .get(getOne)
            .put(editOne)
            .delete(deleteOne);

router.route('/register')
            .post(register)

router.route('/login')
            .post(login)

module.exports = router;