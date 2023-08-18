const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }

  console.log('Authorization Header:', authHeader); // Print the whole authorization header

  const token = authHeader.split(' ')[1];
  console.log('Bearer Token:', token); // Print the extracted token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.sendStatus(403); // You might want to use 401 instead
    }

    // The token is valid, store decoded data in the request object
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
