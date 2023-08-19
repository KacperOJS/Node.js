const users = require('../model/users.json');
const fspromises = require('fs').promises;
const path = require('path');
const handleregisteruser= async(req,res)=>{
	const {user,pwd}=req.body;
	const newUser ={
		"username":user,
		"haslo":pwd
	}
	function setUsers(data){ 
		this.users = data;
	} 
	setUsers([...users,newUser])
	try{ 
		await fspromises.writeFile(
			path.join(__dirname, '..','model','users.json')
		)
		JSON.stringify(users)
		console.log(users)
		res.status(201).json({'success':`New user ${user} created!`})
	}catch(err) {
		console.error(err);
	} 
	
}
module.exports = {handleregisteruser}