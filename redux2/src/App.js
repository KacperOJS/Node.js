import React, { useState } from 'react'
import axios from 'axios';
const App = () => {
	const [username,setUsername]=useState('');
	const [password,setPassword]=useState('');
	const HandleCreateNewuser = ()=>{
		axios.post("http://localhost:3330/createuser",{
			username: username,
			password: password,
		})
		.then(res => {
			console.log(res)
			alert('User Created');
		}
		)
		.catch(err=>console.error(err))

	}
  return (
	<div>
		<input type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
		<input type='text' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
		<button onClick={HandleCreateNewuser}>Wyslij</button>
	</div>
  )
}

export default App