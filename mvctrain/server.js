const express =require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const jsonwebtoken = require('jsonwebtoken');
const users = require('./model/users.json')
const handleregisteruser = require('./controllers/handleregisteruser')


app.get('/',(req,res)=>{
	res.send('home page');
})
app.use('/',handleregisteruser.handleregisteruser);
app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
// handleLogin()
// console.log(findUserContent);
// console.log(users.map((user)=>{
// 	return user.username;
// }));
})