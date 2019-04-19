const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');
const fetch = require('node-fetch')

const router = express.Router();

router.get('/', async (req, res) => {
  fetch('https://api.spacexdata.com/v3/info', {method : "GET"})
  .then(res => res.json())
  .then(json => res.render('index', {json : json, home : 'active'}));
});
module.exports = router;
