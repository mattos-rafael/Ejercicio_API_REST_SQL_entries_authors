const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false  // Use this for self-signed certificates
        // For production with valid SSL certificates, use:
        // rejectUnauthorized: true
        // ca: fs.readFileSync('/path/to/server-ca.pem').toString(),
        // key: fs.readFileSync('/path/to/client-key.pem').toString(),
        // cert: fs.readFileSync('/path/to/client-cert.pem').toString()
    }
  });

module.exports = pool;