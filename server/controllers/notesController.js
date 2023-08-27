const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')

const getAllNotes = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const notes = await Note.find().lean()

    // If no users 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No Notes found' })
    }
const notesWithUser = await Promise.all(notes.map(async (note)=>{
	const user=await User.findById(note.user).lean().exec()
	return {...note ,username:user.username}
}))


    res.json(notes)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user|| !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note' })
    }
	const note = await Note.create({user,title,text})
	if(note) return res.status(201).json({message:"New note Created"})
	else return res.status(400).json({message: 'Invalid to create a Note'})

})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data 
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }
	 const note = await Note.findById(id).exec();
    // Check for duplicate 
	if(!note) return  res.status(400).json({ message: 'All fields except password are required' })

    // Allow updates to the original user 
	const duplicate = await Note.findOne({ title }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }
	note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()
	res.json(`'${updatedNote.title}' updated`)
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
	}

    const result = await note.deleteOne()

    const reply = `Username ${result.title} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}