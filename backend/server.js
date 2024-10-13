const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'buku_tamu'
});

db.connect((err) => {
    if (err){
        console.error('Database Connection Failed:', err.stack);
        return;
    }
    console.log('Connected');
});

// Route untuk tes koneksi server
app.get('/', (req, res) => {
    res.send('API Buku Tamu Berjalan');
});

// Endpoint untuk menambah tamu
app.post('/api/tamu', (req, res) => {
    const { nama, keterangan, pesan } = req.body;
    const sql = 'INSERT INTO tamu (nama, keterangan, pesan) VALUES (?, ?, ?)';
    db.query(sql, [nama, keterangan, pesan], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Tamu berhasil ditambahkan', id: result.insertId });
    });
});

// Endpoint untuk mendapatkan daftar tamu
app.get('/api/tamu', (req, res) => {
    const sql = 'SELECT * FROM tamu';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
});

// Endpoint untuk mengedit tamu
app.put('/api/tamu/:id', (req, res) => {
    const { nama, keterangan, pesan } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE tamu SET nama = ?, keterangan = ?, pesan = ? WHERE id = ?';
    db.query(sql, [nama, keterangan, pesan, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Tamu berhasil diperbarui' });
    });
});

// Endpoint untuk menghapus tamu
app.delete('/api/tamu/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tamu WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Tamu berhasil dihapus' });
    });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
