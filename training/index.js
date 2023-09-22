const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const fsPromises = require("fs").promises;
const path = require("path"); // Import the 'path' module

// Add middleware to parse JSON data
app.use(express.json());

const UsersDB = {
  users: require("./users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

app.get('/', (req, res) => {
  res.send('witaj');
});

app.post('/createuser', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ 'message': 'Required to write in inputs' });

  const checkDuplicated = UsersDB.users.find((person) => person.username === username || person.password === password);
  if (checkDuplicated) return res.status(400).json({ 'message': `In the database, there is already an existing name ${username}` });

  try {
    const newUser = { "username": username, "password": password };
    UsersDB.setUsers([...UsersDB.users, newUser]);
    await fsPromises.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(UsersDB.users, null, 2));
  } catch (err) {
    console.error(err);
  }

  res.status(201).json({ 'success': `Created a new user with name ${username}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
