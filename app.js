const express = require('express')
const entriesRoutes = require('./routes/entries.routes')

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/api', entriesRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

