const User = require('../models/user');

module.exports = {

  login: (req, res) => {
    console.log('LOGIN with routing');
    User.findOne( {
      name: req.body.email //TODO: Check for company not null
    }).then(user => {
      console.warn(user);
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
      user.point += 1000;
      return res.status(200).json({
        message: "User found",
        user: user
      })

    }, error => {
      return res.status(500).json({
        message: 'Login failed! ' + error
      });
    });
  } // end of login

}
