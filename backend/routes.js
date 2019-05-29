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
router.route('/units/list').post(unitCtrl.list);
router.route('/units/generate').post(unitCtrl.generate);

router.route('/units/update').post(unitCtrl.update);
router.route('/unit/fire').post(unitCtrl.fire);
router.route('/unit/lift').post(unitCtrl.lift);

// user
router.route('/user').post(userCtrl.getUser);
router.route('/user/update').post(userCtrl.updateUser);
router.route('/user/top10').get(userCtrl.top10);
// achievements
router.route('/achievments').post(achievementCtrl.achievements);
router.route('/achievments/createdatastructure').post(achievementCtrl.createDataStructure);

// playground
router.route('/playground').get(playgroundCtrl.play);
router.route('/playgroundach').get(playgroundCtrl.selectAchievment);

module.exports = router;
