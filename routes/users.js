const express = require('express');
const router = express.Router();
const User = require('../models/users');
const userControl = require('../controllers/users');

router.route('/register')
  .get(userControl.renderRegisterForm)
  .post(userControl.register);

module.exports = router;