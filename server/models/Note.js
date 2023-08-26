const mongoose = require('mongoose');
const noteSchema = new Scheam({
	username:{ 
		type:mongoose.Scheam.Types.ObcjectId,
		required:true,
		ref: 'User'
	},
	password:{
		type:String,
		required:true
	},
	roles:[{
		type:String,
		default:"Employee"
	}],
	active:{
		type:Boolean,
		default:true	
	},

})
module.exports = mongoose.model('User',noteSchema)