const User = require('../models/user');

module.exports = {
  getUser: (req, res) => {
    const email = req.body.email;
    User.findOne({name: email}).then(
      user => {
        res.status(200).json({
          message: 'Here is your user',
          userId: user._id
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