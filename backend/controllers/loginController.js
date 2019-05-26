const User = require('../models/user');

module.exports = {

  login: (req, res) => {
    console.log('LOGIN with routing');
    User.findOne( {
      email: req.body.email //TODO: Check for company not null
    }).then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed!'
        });
      }
      if(!user.company) {
        return res.status(466).json({
          message: 'Company failed!'
        });
      }

    }, error => {

    });
  } // end of login

}
