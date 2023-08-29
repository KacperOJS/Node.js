import {createSlice} from "@reduxjs/toolkit";
const initialState = [
	{
		id:'1',
		title:'Learning redux Toolkit',
		content:'something'
	},
	{
		id:'2',
		title:'Learning redux Toolkit parto secundo',
		content:'something312312321312'
	}
]
const postsSlice = createSlice({
	name:`posts`,
	initialState,
	reducers:{
		postAdded(state,action){
			state.push(action.payload)
		}
	}
})

export const selectAllPosts = (state) => state.posts;

export const {postAdded} = postsSlice.actions

export default postsSlice.reducer