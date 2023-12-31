# 프로젝트 생성
/react-nodejs-sqlite
```
npx create-react-app client
cd react-nodejs-sqlite
```
# Express.js 및 SQLite3 설치
/react-nodejs-sqlite/server
```
npm install express sqlite3
```
# 서버 설정
```
// react-nodejs-sqlite/server/server.js

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const database = require('./database');

const app = express();
const db = new sqlite3.Database(':memory:');

// CORS 미들웨어 추가
app.use(cors());

// 특정 경로에 대한 CORS 허용
// api 경로에 대해서만 http://example.com 도메인 주소에서의 요청을 허용하도록 설정. optionsSuccessStatus는 응답 상태 코드를 설정하는 옵션으로, 200으로 설정하여 옵션 요청의 응답을 성공 상태로 처리.
// app.use(
//   '/api',
//   cors({
//     origin: 'http://example.com', // 허용할 도메인 주소
//     optionsSuccessStatus: 200 // 응답 상태 코드
//   })
// );

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
// react-nodejs-sqlite/client/src/App.js

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
