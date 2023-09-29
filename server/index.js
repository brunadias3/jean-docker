const express = require('express');
const cors = require('cors')
const mariadb = require('mariadb')

const app = express();
const PORT = 3001;

const pool = mariadb.createPool({
    host: '107.21.206.241',
    user: 'fatec',
    password: '11',
    database: 'exemplo'
});

app.use(cors());
app.use(express.json());

app.post('/create', (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;
    let query = 'INSERT INTO usuarios (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)';
    pool.getConnection()
        .then(conn => {
            conn.query(query, [first_name, last_name, email, phone, password])
                .then(result => {
                    conn.release();
                    res.send(result);
                })
                .catch(err => {
                    conn.release();
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/viewuser', (req, res) => {
    let query = 'SELECT * FROM usuarios';
    pool.getConnection()
        .then(conn => {
            conn.query(query)
                .then(result => {
                    conn.release();
                    res.send(result);
                })
                .catch(err => {
                    conn.release();
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    let query = 'SELECT * FROM usuarios WHERE id = ?';
    pool.getConnection()
        .then(conn => {
            conn.query(query, [id])
                .then(result => {
                    conn.release();
                    res.send(result);
                })
                .catch(err => {
                    conn.release();
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

app.put('/update', (req, res) => {
    const { id, first_name, last_name, email, phone, password } = req.body;
    let query = 'UPDATE usuarios SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ? where id = ?';

    pool.getConnection()
        .then(conn => {
            conn.query(query, [first_name, last_name, email, phone, password, id])
                .then(result => {
                    conn.release();
                    res.send(result);
                })
                .catch(err => {
                    conn.release();
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    let query = 'DELETE FROM usuarios WHERE id = ?';

    pool.getConnection()
        .then(conn => {
            conn.query(query, [id])
                .then(result => {
                    conn.release();
                    res.send(result);
                })
                .catch(err => {
                    conn.release();
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

pool.getConnection()
    .then(conn => {
        console.log("Connected to MariaDB");
        app.listen(PORT, () => {
            console.log("Server is Listening on Port ", PORT);
        });
    })
    .catch(err => {
        console.log("Error connecting to MariaDB:", err);
    });
