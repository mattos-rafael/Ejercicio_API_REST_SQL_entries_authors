const author = require('../models/author.model')

const getAuthors = async (req, res) => {
  let authors
  const email = req.query.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    return res.status(400).json({message: "email format not valid"})
  }

  if (email) {
    authors = await author.getAuthorsByEmail(email)
  } else {
    authors = await author.getAllAuthors()
  }
  
  res.status(200).json(authors)
}

const createAuthor = async (req, res) => {
  const newAuthor = req.body
  const email = newAuthor.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({message: "email format not valid"})
  }

  const result = await author.createAuthor(newAuthor)

  res.status(201).json({message: `usuario creado: ${newAuthor.email}`})
}

const updateAuthor = async (req, res) => {
  const updateAuthor = req.body
  const {email, newEmail} = updateAuthor
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email || !newEmail) {
    return res.status(400).json({message: "Faltan datos obligatorios: email"})
  }
  if (!emailRegex.test(email) || !emailRegex.test(newEmail)) {
    return res.status(400).json({message: "Email no es valido"})
  }

  const result = await author.updateAuthor(updateAuthor)
  res.status(201).json({message: `usuario actualizado: ${email}`})

}

const deleteAuthor = async (req, res) => {
  const {email} = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) {
    return res.status(400).json({message: "Faltan datos obligatorios: email"})
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({message: "Email no es valido"})
  }

  const result = await author.deleteAuthor(email)
  res.status(200).json({message: `Se ha borrado ${email}`})
}

module.exports = {
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor
}