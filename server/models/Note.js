const mongoose = require('mongoose');
const AutoIncreament = require('mongoose-sequence')(mongoose)
const noteSchema = new Scheam({
	user:{ 
		type: mongoose.Schema.Types.ObcjectId,
		required:true,
		ref: 'User'
	},
	title:{
		type:String,
		required:true
	},
	text:{
		type:String,
		required:true
	},
	active:{
		type:Boolean,
		default:false	
	}
},
{
	timestamps:true
}
)
noteSchema.plugin(AutoIncreament,{
	inc_field:'ticket',
	id:'ticketNums',
	start_seq: 500
})
module.exports = mongoose.model('Note',noteSchema)