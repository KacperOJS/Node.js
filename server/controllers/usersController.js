const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt'); 

const getAllUsers = asyncHandler(async (req,res) =>{
	const users = await User.find().select('-password').lean()
	if(!users) return res.status(400).json({message: 'No users found'})
	res.json(users)
})
const createNewUser = asyncHandler(async (req,res) =>{
	const {username,password,roles} = req.body;
	//confirm data
	if(!username || !password || !Array.isArray(roles) || !roles.length) return res.status(400).json({message: 'all fields are required'});

	//check for duplicate
	const duplicate = await User.findOne({username}).lean().exec();
	if(duplicate) return res.status(409).json({message: 'duplicate username'});

	//Hashing password
	const hashedPwd =await bcrypt.hash(password,10)
	const userObject = {username,"password":hashedPwd,roles}

	// create and store new user
	 const user = await User.create(userObject);
	 if(user){
		res.status(201).json({message: `New user ${username} created`})
	 }else{ 
		res.status(400).json({message: `Invalid user data received`})
	 }
})

const updateUser = asyncHandler(async (req,res) =>{
	const {id,username,roles,active,password} = req.body;

	//confirm data
	if(!id || !username || !!Array.isArray(roles) || !roles.length ||typeof active !=='boolean'){
		return res.status(400).json({message: 'All fields required'})
	}
	const user = await User.findById(id).exec()
	if(!user) return res.status(400).json({message: 'User does not exist in database'})

	//check for duplicate

	const duplicate = await User.findOne({username}).lean().exec();
	if(duplicate && duplicate?._id.toString() !==id){
		return res.status(409).json({message:`duplicate username`})
	}
	user.username = username
	user.roles = roles
	user.active = active
	if(password){
		// hash pwd
		user.password = await bcrypt.hash(password,10) //salt rounds
	}
	const updatedUser = await user.save();
	res.json({message:`${updatedUser.username} updated`})
})

const deleteUser = asyncHandler(async (req,res) =>{

})
module.exports ={
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser
}