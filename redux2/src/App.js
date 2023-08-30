import {useDispatch, useSelector} from "react-redux";
import { addUser } from "./features/Users";
import { useState } from "react";
// import { uuid } from 'uuidv4';
const App = () => {
	const dispatch = useDispatch();
	const userList = useSelector((state)=> state.users.value)
	const [name,setName] = useState(" ");
	const [username,setUsername] = useState(" ");
  return (
	<div>

		<input type="text" placeholder="Name..." onChange={(e)=> setName(e.target.value)}/>
		<input type="text" placeholder="Surname.." onChange={(e)=> setUsername(e.target.value)}/>
		<button onClick={()=>{dispatch(addUser({id:userList[userList.length - 1].id + 1,name:name ,surname:username}))}}>Add user</button>
		{userList.map((user,idx)=>{
			return <div key={idx}>
			<h1>{user.name}</h1>
			<h1>{user.surname}</h1>
			</div>
		})}
	</div>
  )
}

export default App