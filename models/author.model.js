const queries = require('../queries/author.queries') // Queries SQL
const pool = require('../config/db_pgsql')

const getAllAuthors = async () => {
  let client, result
  try {
    client = await pool.connect()
    const data = await client.query(queries.getAllAuthors)
    result = data.rows

  } catch(err) {
    console.log(err)
    throw err
    
  } finally {
    client.release()
  }
  return result
}

const getAuthorsByEmail = async (email) => {
  let client, result
  try {
    client = await pool.connect()
    const data = await client.query(queries.getAuthorByEmail, [email])
    result = data.rows

  } catch(err) {
    console.log(err);
    throw err
    
  } finally {
    client.release()
  }
  return result
}

const createAuthor = async (newAuthor) => {
  const {name, surname, email, image} = newAuthor
  let client, result
  try {
    client = await pool.connect()
    const data = await client.query(queries.createAuthor, [name, surname, email, image])
    result = data.rowCount
  } catch(err) {
    console.log(err);
    throw err

  } finally {
    client.release()
  }
  return result
}

const updateAuthor = async (author) => {
  const {name, surname, newEmail, image, email} = author
  let client, result
  try {
    client = await pool.connect()
    data = await client.query(queries.updateAuthor, [name, surname, newEmail, image, email])
    result = data.rowCount

  } catch(err) {
    console.log(err);
    throw err

  } finally {
    client.release()
  }
  return result
}

const deleteAuthor = async (email) => {
  let client, result
  try {
    client = await pool.connect()
    data = await client.query(queries.deleteAuthor, [email])
    result = data.rowCount

  } catch(err) {
    console.log(err);
    throw err

  } finally {
    client.release()
  }
  return result
}

module.exports = {
  getAllAuthors,
  getAuthorsByEmail,
  createAuthor,
  updateAuthor,
  deleteAuthor
}