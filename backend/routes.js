var express = require('express');
var loginCtrl = require('./controllers/loginController');
var regCtrl = require('./controllers/registerController');
var unitCtrl = require('./controllers/unitController');
var achievementCtrl = require('./controllers/achievementController');
var playgroundCtrl = require('./controllers/_playgroundController');
var userCtrl = require('./controllers/userController');

var router = express.Router();

// login
router.route('/login').post(loginCtrl.login);

// register
router.route('/register').post(regCtrl.register);

// units
router.route('/units/list').get(unitCtrl.list);
router.route('/units/generate').post(unitCtrl.generate);

router.route('/units/update').post(unitCtrl.update);
router.route('/unit/fire').post(unitCtrl.fire);
router.route('/unit/lift').post(unitCtrl.lift);

// user
router.route('/user').post(userCtrl.getUser);

// achievements
router.route('/achievments').get(achievementCtrl.achievements); // TODO typo: e is missing from everywhere, like lxn qka style:D

// playground
router.route('/playground').get(playgroundCtrl.play);
router.route('/playgroundach').get(playgroundCtrl.selectAchievment);

module.exports = router;
