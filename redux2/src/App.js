import {useSelector} from "react-redux";

const App = () => {
	const userList = useSelector((state)=> state.users.value)
  return (
	<div>
		App
		{userList.map((user)=>{
			return <h1>{user.name}</h1>
		})}
	</div>
  )
}

export default App