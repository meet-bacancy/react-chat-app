const express = require('express');

const userController = require('../controllers/admin/users');

const router = express.Router();

router.get('/get-room', userController.getRoom);

router.post('/add-user', userController.postAddUser);

module.exports = router;
