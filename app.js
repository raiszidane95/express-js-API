const express = require('express');
const app = express();
const port = 3000;
const response = require('./response');
const db = require('./connection');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => console.log(`listening on port: ${port}`));

app.get('/', (req, res) => {
    const data = { status: 'API Ready to use' }
    const responseData = response(200, 'SUCCESS', data);
    return res.json(responseData);
});

app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (error, result) => {
        const responseData = response(200, 'SUCCESS', result);
        return res.json(responseData);
    })
});

app.post('/mahasiswa', (req, res) => {
    const { nama, npm, jurusan } = req.body;
    const sql = `INSERT INTO mahasiswa(nama, npm, jurusan) VALUES ('${nama}','${npm}','${jurusan}')`;
    db.query(sql, (error, result) => {
        return res.json(response(200, 'SUCCESS', result))
    })
})

app.put('/mahasiswa', (req, res) => {
    const id = req.query.id;
    if (id === null) return res.json({ message: "Invalid Id" })
    const { nama, npm, jurusan } = req.body;

    const sql = `UPDATE mahasiswa SET nama ='${nama}',npm ='${npm}',jurusan='${jurusan}' WHERE id = ${id}`;
    db.query(sql, (error, result) => {
        console.log(result);
        console.log(error);
        return res.json(response(200, 'SUCCESS', result))
    })
})

app.delete('/mahasiswa', (req, res) => {
    const id = req.query.id;
    const sql = `DELETE FROM mahasiswa  WHERE id=${id}`
    db.query(sql, (error, result) => {
        return res.json(response(200, 'SUCCESS', result));
    })
})

app.use((req, res) => {
    res.status(404);
    res.json({ message: 'Invalid URL API' })
})