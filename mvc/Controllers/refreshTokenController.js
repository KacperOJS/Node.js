const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users } = require('../model/users.json'); // Assuming 'users.json' contains an array of user objects.
require('dotenv').config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies; // Use 'req.cookies' instead of 'req.cookie'
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = users.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); // Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Forbidden

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: '30s' }
    );
    

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
