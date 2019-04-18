const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');
const fetch = require('node-fetch')

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index')
});
module.exports = router;
