const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'express-mahasiswa'
})

module.exports = db