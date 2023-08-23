const express = require('express');
const app = express();
PORT = process.env.PORT || 3333;

const array = [
	[1, 2, 3, 4, 5, 6],
	[10, 12, 14, 16, 18, 20],
	[100, 120, 140, 160, 180, 200],
  ];
  
  let sum = 0;
  
  for (let i = 0; i < array.length; i++) {
	for (let j = 0; j < array[i].length; j++) {
	  console.log(array[i][j]);  // Access the correct element using array[i][j]
	  sum += array[i][j];
	}
  }
  
  console.log(sum);
  

app.get('/',(req,res)=>{
	res.send('witaj')
})

app.listen(PORT,()=>{
	console.log(`Server is running on port ${PORT}`);
})