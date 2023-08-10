const express = require('express');
const path =require('path');
const {v4: uuid} =require('uuid');
const fs = require('fs');


const fsPromises = require('fs').promises;

const logEvents = async (message)=>{
	const dateTime =`${new Date()}`;
	const logitem = `${dateTime} \t${uuid()} \t${message} \n`;
	console.log(logitem);
	try{
		if(!fs.existsSync(path.join(__dirname,'logs'))){
			await fsPromises.mkdir(path.join(__dirname,'logs'));
		}

		await fsPromises.appendFile(path.join(__dirname,'logs','eventLog.txt'),logitem)
	}catch(err){
		console.error(err);
	}
}
// const app = express();
// app.get('/',(req,res)=>{
// res.sendFile(path.resolve(__dirname,'./index.html'))
// })
// app.all('*',(req,res)=>{
// 	res.status(404).send('resource not found')
// })

// app.listen(5000,()=>{

// })
module.exports = logEvents;