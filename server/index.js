const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const connection = process.env.mongoose;
const cors = require('cors');
app.use(cors());
mongoose.connect(connection, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
  })
  .then(() => {
	console.log('Connected to MongoDB');
  })
  .catch((error) => {
	console.error('Error connecting to MongoDB:', error);
  });
app.use(express.json())

app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find().exec();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
});
app.post("/createUser", async (req,res)=>{
	const user =req.body;
	const newUser = new UserModel(user);
	await newUser.save();
	res.json(user);
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
