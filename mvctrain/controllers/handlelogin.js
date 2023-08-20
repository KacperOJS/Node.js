// const handlelogin = async(req,res)=>{
// 	const {user} = req.body
// 	const findUserContent = users.find(person => person.username ===user)
// 	console.log(findUserContent);
// 	// jsonwebtoken.sign({
// 	// 	username:"kacper"
// 	// })
// }
// module.exports =handlelogin
const usersDB = {
	users: require('../model/users.json'),
	setUsers: function(data) {
	  this.users = data;
	}
  };
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises=require('fs').promises;
const path = require('path');
const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	const finduser = usersDB.users.find(person => person.username === user);
	
	if (!finduser) {
	  return res.status(401).json({ error: 'Invalid credentials' });
	}
  
	try {
	  const accessToken = jwt.sign(
		{ "username": finduser.username },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '30s' }
	  );
	  const refreshToken = jwt.sign(
		{ "username": finduser.username },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '1d' }
	  );
  
	  const otherUsers = usersDB.users.filter((person => person.username !== finduser.username));
		 const currentUser = {...finduser,refreshToken};
		 usersDB.setUsers([...otherUsers,currentUser]);  
	  await fsPromises.writeFile(
		path.join(__dirname, '..', 'model', 'users.json'),
		JSON.stringify(usersDB.users,null,2)
	  );
  
	  res.json({ accessToken });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ error: 'Internal server error' });
	}
  };
  
  module.exports = { handleLogin };