const User = require('../models/user');

module.exports = {
  getUser: (req, res) => {
    const email = req.body.email;
    User.findOne({name: email}).then(

      user => {
        user.point += 1000;
        res.status(200).json({
          message: 'Here is your user',
          user: user
        });
      },
      error => {
        res.status(500).json({
          message: 'User is not available',
          error: error
        });
      }
    );
  }
}
