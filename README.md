# 프로젝트 생성
```
// backend/client
npx create-react-app react-nodejs-sqlite
cd react-nodejs-sqlite
```
# Express.js 및 SQLite3 설치
```
npm install express sqlite3
```
# 서버 설정
```
// backend/server/server.js

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
```
# React 컴포넌트 작성
```
// src/App.js

import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.age}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```
