const express = require('express');
const router = express.Router();

// require in apiController middleware
const apiController = require('../controllers/apiController');
const cookieController = require('../controllers/cookieController');
const cookieParser = require('cookie-parser');
const { application } = require('express');



//test my cookies
router.get('/', function (req, res) {
  res.cookie('name', 'express').send('cookie set'); //Sets name = express
});


// GET request for all unclaimed items
router.get(
  '/',
  apiController.getItems,
  cookieController.setCookie,
  (req, res) => res.status(200).json(res.locals.items)
);

// POST request for adding items
router.post('/add-item', apiController.addItem, (req, res) =>
  res.status(200).send('Item added')
);

// POST request for selecting tag
router.post('/tag', apiController.getItemByTag, (req, res) =>
  res.status(200).json(res.locals.data)
);

// POST request for user login
router.post('/login', apiController.getUser, cookieController.setCookie, (req, res) => {

  res.status(200).end();
});

// POST request for user signup

router.post(
  '/signup',
  apiController.createUser,
  cookieController.setCookie,
  (req, res) => {
    res.status(200).end();
  }
);

// PATCH request for updating "claimed" status
router.patch('/update-item', apiController.updateItem, (req, res) =>
  res.status(200).send('Item claimed')
);
//mahmoud post request to the login and post request to the sign up

module.exports = router;
