const router = require('express').Router()
const {getAuthors, createAuthor, updateAuthor, deleteAuthor} = require('../controllers/author.controller')

router.get('/authors', getAuthors)
router.post('/authors', createAuthor)
router.put('/authors', updateAuthor)
router.delete('/authors', deleteAuthor)


module.exports = router