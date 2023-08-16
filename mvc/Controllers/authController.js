const usersDB = {
	users: require('../model/users.json'),
	setUsers: function(data) {
	  this.users = data;
	}
  };
  const bcrypt = require('bcrypt');

  const handleLogin = async(req,res)=>{
	const {user,pwd}=req.body;
	if(!user || !pwd) return res.status(400).json({'message':'Username and password are required'})
	const findUser = usersDB.users.find((person)=>person.username ===user)
	if(!findUser) return res.sendStatus(401); //Unauthorized
	//evaluate password
	const match = await bcrypt.compare(pwd,findUser);
	if(match){
		//create  JWTs token
		res.json({'success': `User ${user} Logged in`})
	}else res.status(401);
  }

  module.exports = {handleLogin}