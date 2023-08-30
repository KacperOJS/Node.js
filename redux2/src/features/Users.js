import {createSlice} from '@reduxjs/toolkit';
import { UsersDB } from './UsersDB';
export const UserSlice = createSlice({
	name:"users",
	initialState:{value:UsersDB},
	reducers:{
		addUser:(state,action)=>{
			state.value.push(action.payload);
		}
	}
});

export const {addUser} = UserSlice.actions;
export default UserSlice.reducer;