const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');
const fetch = require('node-fetch')

const router = express.Router();

router.get('/', async (req, res) => {
  fetch('https://api.spacexdata.com/v3/launches/upcoming?sort=launch_date_utc', {method : "GET"})
  .then(res => res.json())
  .then(json => res.render('launches', {json : json, launch : 'active'}));
});

router.get('/all', async (req, res) => {
  fetch('https://api.spacexdata.com/v3/launches', {method : "GET"})
  .then(res => res.json())
  .then(json => res.json(json));
});

router.get('/:id', async (req, res) => {
  fetch(`https://api.spacexdata.com/v3/launches/${req.params.id}`, {method : "GET"})
  .then(res => res.json())
  .then(json => res.render('show', {json : json, allLaunch : 'active'}));
});

module.exports = router;
