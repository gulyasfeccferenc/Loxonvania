const User = require('../models/user');

module.exports = {

  register: (req, res) => {
    console.log('Register controller');
    console.log(req.body);
    const newUser = new User({
      name: (req != null && req.body != null && req.body.name != null) ? req.body.name : null,
      company: (req != null && req.body != null && req.body.company != null) ? req.body.company : null,
      point: 0,
      avatar: '',
      level: 0
    });
    console.log(newUser);
    if (newUser.company == null || newUser.name == null || newUser.company.length < 1) {
      res.status(401).json({
        message: 'Company name not found!'
      });
    } else {
      newUser.save().then(result => {
        res.status(201).json({
          message: 'Company created!',
          result: result
        });
      }).catch(error => {
        res.status(500).json({
          message: 'Company couldn\'t be created!',
          error: error
        });
      });
    }
  } // end of register

}
