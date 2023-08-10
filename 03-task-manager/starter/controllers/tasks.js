const getAllTasks = (req,res)=>{
	res.send('all items')
}
const createTask = (req,res)=>{
	res.json(req.body)
}
const getTask = (req,res)=>{
	res.send('all items')
}
const updateTask = (req,res)=>{
	res.send('all items')
}
const deleteTask = (req,res)=>{
	res.send('all items')
}
module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
}