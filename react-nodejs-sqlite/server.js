// server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER
    )
  `);

  db.run("INSERT INTO users (name, age) VALUES (?, ?)", ['John Doe', 30]);
  db.run("INSERT INTO users (name, age) VALUES (?, ?)", ['Jane Smith', 25]);
});

app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
