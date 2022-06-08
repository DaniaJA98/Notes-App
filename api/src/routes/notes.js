const { Router } = require('express');
const { route } = require('./users');
const router = Router();

const { getNotes, createNote, getNote, updateNote, deleteNote } = require('../controllers/notes.controller');

router.route('/')
    .get(getNotes)
    .post(createNote)

router.route('/:id')
    // Modifica todo
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)


// Modifica solo un elemento
// .patch()

module.exports = router;