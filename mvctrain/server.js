const express =require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const jsonwebtoken = require('jsonwebtoken');
const handleregisteruser = require('./controllers/handleregisteruser')
const users = require('./model/users.json');
const handleLogin = require('./controllers/handlelogin')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
	res.send('home page');
})
app.post('/register',handleregisteruser.handleregisteruser);
app.post('/login', handleLogin.handleLogin);

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
// handleLogin()
// console.log(findUserContent);
// console.log(users.map((user)=>{
// 	return user.username;
// }));
})