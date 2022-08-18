const express = require('express');
const db = require('../models/freeStuffModel');
const bcrypt = require('bcrypt');

const apiController = {};

// helper function to invoke global error handler on server.js
const createErr = errInfo => {
  const { method, type, err, status } = errInfo;
  return {
    log: `apiController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in apiController.${method}. Check server logs for details.`,
    },
    status,
  };
};

// This middleware function will send a query to retrieve all "unclaimed" items in the database and return an array of objects to the frontend to be displayed.
// JO Updates 8/17 - Added Query string to send tags to frontend and subsequent fxnalitly to do so after db query
apiController.getItems = async (req, res, next) => {
  const queryStr = `SELECT *
    FROM item
    WHERE item.claimed = false;
  `;
  // query string for getting tags to send to frontend
  const queryStrTags = `SELECT DISTINCT "tag"."name" FROM "tag"
  JOIN "tag_for_item" ON "tag"."_id" = "tag_for_item"."tag_id"
  JOIN "item" ON "item"."_id" = "tag_for_item"."item_id"
  WHERE "item"."claimed" = false;`

  try {
    const data = await db.query(queryStr);
    // console.log('Data returned from get req to /api', data);
    const tagData = await db.query(queryStrTags);
    res.locals.items = data.rows;
    res.locals.tagData = tagData.rows;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getItems',
        type: 'did not connect to database',
        err,
        status: 500,
      })
    );
  }
};

// Iteration goal:
// If user is logged in, then the user name should be sent in the body of the request
// The following middleware should query the database to get the id of the user with that name
// Add the item with the user_id
apiController.addItem = async (req, res, next) => {
  // need to discuss with front end - do they want to send a date?
  // or just use default date? (I WANT THIS!)
  // JO 8/17 - Add email as an element to deconstruct from req body for purposes of associating added item w/ user
  const { name, description, quantity, imageURL, tag, email } = req.body;
  // should we handle errors if the name (or other properties) are missing here? or on front end?

  try {
    // insert item to item table and return the item id
    // JO 8/17 - adding USER_ID, DATE and CLAIMED statuses into our query string and into our values syntax ($5, $6)
    const queryStrInsert = `INSERT INTO item (user_id, name, description, quantity, imageURL, date, claimed)
      VALUES (
        (SELECT accounts._id FROM accounts WHERE accounts.email = $1), $2, $3, $4, $5, $6, $7)
      RETURNING _id;
    `;
    const insertValues = [email, name, description, quantity, imageURL, new Date(), false];
    const insertData = await db.query(queryStrInsert, insertValues);
    const itemID = insertData.rows[0]._id;

    // query the tag table to get tag id from the tag name
    const queryStrTag = `SELECT _id
      FROM tag
      WHERE name=$1;
    `;
    const tagValue = [tag];
    const tagData = await db.query(queryStrTag, tagValue);
    const tagID = tagData.rows[0]._id;

    // insert the item id and tag id into the tag_for_item table
    const queryStrTagForItem = `INSERT INTO tag_for_item (item_id, tag_id)
      VALUES ($1, $2);
    `;
    const tagForItemValues = [itemID, tagID];
    await db.query(queryStrTagForItem, tagForItemValues);

    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'addItem',
        type: 'did not connect to database',
        err,
        status: 500,
      })
    );
  }
};


// This middleware function will be invoked when a request is made to the /api/tag endpoint. It will:
// 1) Query 1 - Extract the tag sent from the frontend and make a query to retrieve the tag id
// 2) Query 2 - Query for items that match that tag id by JOINING the item_table and tag_for_item join table
// 3) Send the results back to the frontend

apiController.getItemByTag = async (req, res, next) => {
  try {
    // Get tag id - currently works for a single tag
    // Multiple tag attempt will be pre-empted with MT:
    // assuming we receive an array of multiple tags from the frontend, tag will be an array of values
    const { tag } = req.body;
    // maybe we want an if else - if the tag request is just the length of one, we can keep current code
    // else we'll need a separate codeset
    // JO 8/16 - Added if else statement and subsequent code to handle single tag vs multi tag getitembytag requests
    // JO 8/17 - Removed if else statements for DRY purposes and added for loops to handle multi tag situations
    const params = Array.isArray(tag) ? tag : [tag];
    console.log("params", params);
    let query = `SELECT * FROM tag t WHERE t.name = $1`;
    // for loop below handles case where params contains > 1 tag (not currently implemented but stretch goal)
    for (let i = 1; i < params.length; i++) {
      query += ` UNION SELECT * FROM tag t WHERE t.name = $${i + 1}`
    }
    const data = await db.query(query, params);
    console.log("Tag data ", data);
    // below for loop handles single and mult tag searches (multi tag not yet implemented - stretch goal)
    const tagId = [];
    for (let i = 0; i < data.rows.length; i++) {
      console.log("data rows index i", data.rows[i]._id)
      tagId.push(data.rows[i]._id);
    }
    console.log("TagId", tagId);

    let query2 = `
      SELECT *
      FROM item i
      INNER JOIN tag_for_item tfi ON i._id = tfi.item_id
      WHERE tag_id = $1`;

    const params2 = tagId;
    console.log("Params2", params2);
    // below for loop handles multi tag searches (not yet implemented - stretch goal);
    for (let i = 1; i < params2.length; i++) {
      query2 += ` UNION
      SELECT name, description, date, claimed, quantity, imageurl
      FROM item i
      INNER JOIN tag_for_item tfi ON i._id = tfi.item_id
      WHERE tag_id = $${i + 1}`;
    }
    const data2 = await db.query(query2, params2);
    console.log("data2", data2);
    res.locals.data = data2.rows;
    return next();

    //PRIOR CODE
    // const query = 'SELECT * FROM tag t WHERE t.name = $1';
    // const params = [tag];
    // const data = await db.query(query, params);
    // const tagId = data.rows[0]._id;

    // Get all items with input tag id from previous query
    // const query2 = `
    // SELECT *
    // FROM item i
    // INNER JOIN tag_for_item tfi ON i._id = tfi.item_id
    // WHERE tag_id = $1;`;
    // const params2 = [tagId];
    // const data2 = await db.query(query2, params2);

    // res.locals.data = data2.rows;
    // return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getItemByTag',
        type: 'could not connect to database',
        err,
        status: 500,
      })
    );
  }
};

// This middleware function will receive the id of a posted, unclaimed item from the frontend. It will:
// Send a query to UPDATE the item's "claimed status" in the item table under the "claimed" column which is a boolean

// Iteration goal:
// Once an item's claimed status is updated, this should return the email of the user who posted this item to the person who claimed the item.
// We currently do not have login/signup/auth set up.

apiController.updateItem = async (req, res, next) => {
  const { _id: item_id } = req.body;
  const query = 'UPDATE item SET claimed = $1 WHERE item._id = $2';
  const params = [true, item_id];

  try {
    await db.query(query, params);
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'updateItem',
        type: 'error connecting to database',
        err,
        status: 500,
      })
    );
  }

};
//Mak: controler/methods for login and signup

apiController.createUser = async(req, res, next) => {
  //console.log as a place holder to check if createUser method is working
  console.log('createUser is working');
  const { first_name, last_name, email, password } = req.body;
  //check req.body object keys
  console.log(req.body);
  try {
    const queryStr = `INSERT INTO accounts (first_name, last_name, email, password )
    VALUES ($1, $2, $3, $4)`;
    res.locals.id = email;
    const hash = await bcrypt.hash(password, 10);
    await db.query(queryStr, [first_name, last_name, email, hash]);

    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'createUser',
        type: 'User exist or not correct format entered', //not sure of the right error message, discuss it with the team.
        err,
        status: 401,// 401 might be the right error code
      })
    );
  }

};

apiController.getUser = async (req, res, next) => {
  //console log to see if the method is working
  console.log('getUser is working');
  const { email, password } = req.body;
  try {
    const queryStr = `
  SELECT *
  FROM accounts
  WHERE email = $1  `;
    const result = await db.query(queryStr, [email]);
    if (result.rows.length === 0) {
      console.log('no user in DB');
      res.status(401).end();
    } else {
      const isPassword = await bcrypt.compare(password, account.hash);
      if(isPassword){
        res.status(201).json('valid email and password');
      }else{
        res.send('wrong email or/and password')
      }
      // console.log('check password');
      // if (result.rows[0].password === password) {
      //   res.locals.id = result.rows[0].id;
      //   return next();
      // } else {
      //   res.status(401).end()
      // }
    }
}catch(err){
  res.status(401).end();
}
};

module.exports = apiController;
