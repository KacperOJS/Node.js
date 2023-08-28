import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/Welcome';
const App = () => {
  return (
	<Routes>
		<Route path='/' element={<Layout/>}>
			<Route index element={<Public/>}/>
			<Route path="login" element={<Login/>}/>

			<Route path="dash" element={<DashLayout/>}/>

			<Route index element={<Welcome/>}/>
		</Route>
	</Routes>
  )
}

export default App