const db = require('../models/freeStuffModel');
const cookieController = {};

//setting up cookies to test, not final yet
cookieController.setCookie = (req, res, next) => {
    //to confirm if the cookie has been logged
    res.cookie('cookieTest', "yay! it worked");
    return next();
};

//set ssid for account cookie session
cookieController.setSSIDCookie = (req, res, next) => {
    // check if account exists in the database
    const { email } = req.body;
    //use conditional to select specific email
    //discuss seleciting email later

    const queryStr = `SELECT email FROM accounts`

    const account = db.query(queryStr,email, (err, account) => {
        if (!err) {
          res.cookie('ssid', account, {
            httpOnly: true,
            secure: true,
            maxAge: 5000,
          });
          return next();
        } else {
          // error handling
          console.log('an error in cookieController.setSSIDCookie');
          return next('next');
        }
    } )

}

module.exports = cookieController;
