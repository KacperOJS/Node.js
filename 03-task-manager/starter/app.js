const express =require('express');
const app = express();
const tasks = require('./routes/tasks')
const port = 5000;


//middleware
app.use(express.json())


app.get('/',(req,res)=>{
res.send('Task Manager App')
})

app.use('/api/v1/tasks',tasks)

app.listen(port, () => {
	console.log(`this is our port ${port}`)
  })