var express = require('express');
var loginCtrl = require('./controllers/loginController');
var regCtrl = require('./controllers/registerController');
var unitCtrl = require('./controllers/unitController');
var achievementCtrl = require('./controllers/achievementController');
var playgroundCtrl = require('./controllers/_playgroundController');

var router = express.Router();

// login
router.route('/login').post(loginCtrl.login);

// register
router.route('/register').post(regCtrl.register);

// units
router.route('/units/list').get(unitCtrl.list); // TODO be aware of the usage of 'get' instead of 'use' from app.js
router.route('/units/generate').get(unitCtrl.generate); // TODO be aware of the usage of'get' instead of 'use' from app.js

router.route('/units/update').get(unitCtrl.update); // TODO be aware of the usage of'get' instead of 'use' from app.js
router.route('/units/destroy').get(unitCtrl.destroy); // TODO be aware of the usage of'get' instead of 'use' from app.js


// achievements
router.route('/achievments').get(achievementCtrl.achievements); // TODO typo: e is missing from everywhere, like lxn qka style:D

// playground
router.route('/playground').get(playgroundCtrl.play);
router.route('/playgroundach').get(playgroundCtrl.selectAchievment);

module.exports = router;
