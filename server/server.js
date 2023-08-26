const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3500;
const path = require('path');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logger,logEvents } = require('./middleware/logger');

connectDB();

app.use(logger);

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/',express.static(path.join(__dirname, '/public')))

app.use('/',require('./routes/root'))

app.all('*',(req,res)=>{
	res.status(404);
	if(req.accepts('html')){
		res.sendFile(path.join(__dirname,'views','404.html'))
	}else if(req.accepts('json')){
		res.json({message:"404 Not Found"})
	}else {
		res.type('txt').send('404 Not Found');
	}
})
app.use(errorHandler);

mongoose.connection.once('open',()=>{
	console.log('Connected to MongoDB')
	app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))
})
mongoose.connection.on('error',err=>{
	console.log(err);
	logEvents(`${err.no}: ${err.code} ${err.syscall} \t ${err.hostname}`,'mongoErrLog.log')
})
