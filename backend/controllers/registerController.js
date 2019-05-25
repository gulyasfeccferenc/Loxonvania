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
    if (newUser.company == null || newUser.name == null) {
      res.status(202).json({
        message: 'Not your arany micikéd'
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
