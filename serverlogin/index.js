const express=require('express');
const app = express();
PORT = process.env.PORT || 3330
const fspromises = require('fs').promises;
const path = require('path');
const cors = require('cors');
app.use(cors())
const usersDB = {
	users: require('./models/users.json'),
	setUsers: function(data) {
	  this.users = data;
	}
  };
app.use(express.json());


app.get('/',(req,res)=>{
	 res.send(`server is on home page`);
})

app.post('/createuser', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'error': 'Username and password need to be fulfilled' });

    const checkDuplicated = usersDB.users.find(person => person.username === username);
    if (checkDuplicated) return res.status(400).json({ 'error': "You can't have that nickname" });

    try {
        const newUser = { "username": username, "password": password };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fspromises.writeFile(path.join(__dirname, 'models', 'users.json'), JSON.stringify(usersDB.users));
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred' });
    }
});




app.listen(PORT,()=>{
	console.log(`Server is listening on port ${PORT}`);
})