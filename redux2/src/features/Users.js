import {createSlice} from '@reduxjs/toolkit';
import { UsersDB } from './UsersDB';
export const UserSlice = createSlice({
	name:"users",
	initialState:{value:UsersDB},
	reducers:{
		addUser:(state,action)=>{

		}
	}
})

export default UserSlice.reducer;