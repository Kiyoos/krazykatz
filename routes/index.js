const express = require('express');
const router = express.Router();
// DO NOT UNCOMMENT until Auth0 is working -Nina
const { auth } = require('express-openid-connect');
const auth0Controller = require('../controllers/auth0');
// const homeController = require('../controllers/index');

const swagger = require('./swagger');
const appointments = require('./appointments');
const pets = require('./pets');
const users = require('./users');
const veterinarians = require('./veterinarians');
const auth0 = require('./auth0');
// const oauth = require('./oauth');

router.use(auth(auth0Controller.config));
router.use('/auth0', auth0);
// router.use('/oauth', oauth);
router.use('/api-docs', swagger);
router.use('/appointments', appointments);
router.use('/pets', pets);
router.use('/users', users);
router.use('/veterinarians', veterinarians);

// For Testing routes case
router.get('/', (req, res) => {
    // Send a JSON response
    res.json({ name: 'frodo' });
  });

module.exports = router;
