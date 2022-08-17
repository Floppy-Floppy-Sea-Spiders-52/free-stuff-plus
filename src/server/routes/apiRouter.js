const express = require('express');
const router = express.Router();

// require in apiController middleware
const apiController = require('../controllers/apiController');

// GET request for all unclaimed items
router.get('/', apiController.getItems, (req, res) =>
  res.status(200).json(res.locals.items)
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
router.post('/login', apiController.getUser, (req, res) => {
  res.status(200).redirect('/whateveritis');//placeholder for now
});

// POST request for user signup

router.post('/signup',apiController.createUser, (req,res) => {
  res.status(200).redirect('/whateveritis'); //placeholder for now
});

// PATCH request for updating "claimed" status
router.patch('/update-item', apiController.updateItem, (req, res) =>
  res.status(200).send('Item claimed')
);
//mahmoud post request to the login and post request to the sign up

module.exports = router;
