const entry = require('../models/entries.model');

const getEntries = async (req, res) => {
    let entries;
    const email = req.query.email

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        res.status(400).json({
        items_found: 0,
        email,
        error: "Formato de email no válido",
      });
    }

    if (email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
}

const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}

    const {title, content, email, category} = newEntry;

    if (!title || !content || !email) {
      return  res.status(400).json({
         "items_created": 0,
          data: newEntry,
          error: 'faltam dados obrigatorios: title, content, email'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        items_created: 0,
        data: newEntry,
        error: "Formato de email no válido",
      });
    }

    try {
      const response = await entry.createEntry(newEntry);
      res.status(201).json({
          "items_created": response,
          data: newEntry
      });
    } catch (err) {
      console.log(err.message)
      res.status(400).json({
         "items_created": 0,
          data: newEntry,
          e: err.message
      });
    }
    
}

const deleteEntry = async (req, res) => {
  const {title} = req.body
  if (!title) {
    return  res.status(400).json({
        "items_deleted": 0,
        data: editedEntry,
        error: 'faltam dados obrigatorios: title'
    });
  }
  
  try {
    const response = await entry.deleteEntry(title)
    res.status(200).json({message: `Se ha borrado la entry '${title}'`})

  }catch(err) {
    console.log(err);
    
  }
}

const updateEntry = async (req, res) => {
    const editedEntry = req.body; // {title,content,email,category}

    const {title, email} = editedEntry;

    if (!title) {
      return  res.status(400).json({
         "items_created": 0,
          data: editedEntry,
          error: 'faltam dados obrigatorios: title, content, email'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        items_created: 0,
        data: editedEntry,
        error: "Formato de email no válido",
      });
    }

    try {
      const response = await entry.updateEntry(editedEntry);
      res.status(201).json({message: `Se ha modificado la entry '${title}' `});
    } catch (err) {
      console.log(err.message)
      res.status(400).json({
         "items_created": 0,
          data: editedEntry,
          e: err.message
      });
    }
    
}

module.exports = {
  getEntries,
  createEntry,
  deleteEntry,
  updateEntry
}