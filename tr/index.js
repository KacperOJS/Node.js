const { error } = require('console');
const express = require('express')
const app = express();
const PORT =3600;
const path = require('path');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const fsPromises = require('fs').promises;
const jwt =require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

dotenv.config();
const usersDB = {
	users: require('./users.json'),
	setUsers: function(data){
		this.users=data;
	}
}
app.post('/createuser', async (req,res)=>{
	const {username,password}=req.body;
	if(!username || !password) return res.json({'message': 'Required to write in inputs'});
	const checkDuplicated = usersDB.users.find((person)=> person.username ===username || person.password === password);
	if(checkDuplicated) return res.status(400).json({'message': `In database is Already existing name ${username}`})
	

	
	try{
		const newUser = {"username": username,"password":password};
		usersDB.setUsers([...usersDB.users, newUser])
		await fsPromises.writeFile(path.join(__dirname,'users.json'),JSON.stringify(usersDB.users,null,2));
		
	}catch(err){
		console.error(err);
	}


	res.status(201).json({'success':`Created a new user with name ${username}`})
})


const tokenStore = {};

// Your other middleware and routes go here...

// Your '/login' route remains mostly the same, but store the token in memory
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const findUser = usersDB.users.find((person) => person.username === username && person.password === password);

  if (!findUser) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Use the ACCESS_TOKEN_SECRET from the environment variable
  const token = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '30s'
    }
  );

  // Store the token in memory
  tokenStore[username] = token;

  try {
    // Append the login information to the 'information.txt' file
    await fsPromises.appendFile(
      path.join(__dirname, 'information.txt'),
      `Username ${username} has logged on ${new Date()}\n`
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  res.status(200).json({ accessToken: token, message: `Logged into ${username}` });
});






  app.put('/updateuser', (req, res) => {
	const { username, newPassword } = req.body;
  
	if (!username || !newPassword) {
	  return res.status(400).json({ message: 'Username and new password are required' });
	}
  
	// Find the user in the array
	const userToUpdate = usersDB.users.find((person) => person.username === username);
  
	if (!userToUpdate) {
	  return res.status(400).json({ message: `User with username ${username} not found` });
	}
  
	// Update the user's password
	userToUpdate.password = newPassword;
  
	// Optionally, you can update the users.json file to reflect the changes
	fsPromises.writeFile(
	  path.join(__dirname, 'users.json'),
	  JSON.stringify(usersDB, null, 2)
	)
	  .then(() => {
		res.status(200).json({ message: `Password for user ${username} has been updated` });
	  })
	  .catch((err) => {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	  });
  });

  app.delete('/deleteuser', (req, res) => {
	const { username } = req.body;
  
	// Find the index of the user in the array
	const userIndex = usersDB.users.findIndex((person) => person.username === username);
  
	if (userIndex === -1) {
	  return res.status(400).json({ message: `There is no Username like ${username} in our database` });
	}
	console.log(userIndex);
  
	// Remove the user from the array
	usersDB.users.splice(userIndex, 1);
  
	// Optionally, you can save the updated user data to your JSON file here.
  
	res.status(200).json({ message: `User ${username} has been deleted` });
  });

app.get('/',(req,res)=> res.send('witaj'))


app.listen(PORT,(req,res)=>{
	console.log(`Server listening on PORT ${PORT}`);
})