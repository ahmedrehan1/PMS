const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
app.use(express.static('public'));  // Serve static frontend files

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ahmed',
    password: 'Rehan@1234',
    database: 'pharma_db'
});

// Search for medicines by name
app.get('/search-medicines', (req, res) => {
    const searchQuery = req.query.q;  // 'q' is the query parameter for the search

    // SQL query to search for medicines where the name contains the search query
    const sql = `SELECT * FROM medicines WHERE name LIKE ?`;
    db.query(sql, [`%${searchQuery}%`], (err, result) => {
        if (err) throw err;
        res.json(result);  // Return the search results as JSON
    });
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Fetch all medicines
app.get('/medicines', (req, res) => {
    const sql = 'SELECT * FROM medicines';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/add-medicine', (req, res) => {
    const { name, price, quantity, expiry_date } = req.body;
    const sql = 'INSERT INTO medicines (name, price, quantity, expiry_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, price, quantity, expiry_date], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Medicine added successfully' });
    });
});


// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
