const usersDB = {
	users: require('../model/users.json'),
	setUsers: function(data) {
	  this.users = data;
	}
  };
  
  const fspromises = require('fs').promises;
  const path = require('path');
  
  const handleregisteruser = async (req, res) => {
	const { user, pwd } = req.body;
  
	try {
	  const newUser = {
		"username": user,
		"password": pwd // Store the hashed password
	  };
	  usersDB.setUsers([...usersDB.users, newUser]);
  
	  await fspromises.writeFile(
		path.join(__dirname, '..', 'model', 'users.json'),
		JSON.stringify(usersDB.users, null, 2)
	  );
  
	  console.log(usersDB.users);
	  res.status(201).json({ 'success': `New user ${user} created!` });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ 'error': 'Internal server error' });
	}
  };
  
  module.exports = { handleregisteruser };