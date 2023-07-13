// react-nodejs-sqlite/server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const database = require('./database');

const app = express();
const db = new sqlite3.Database('./data.db');

// CORS 미들웨어 추가
app.use(cors());
// Body-parser 미들웨어 사용
app.use(bodyParser.json());

// 특정 경로에 대한 CORS 허용
// api 경로에 대해서만 http://example.com 도메인 주소에서의 요청을 허용하도록 설정. optionsSuccessStatus는 응답 상태 코드를 설정하는 옵션으로, 200으로 설정하여 옵션 요청의 응답을 성공 상태로 처리.
// app.use(
//   '/api',
//   cors({
//     origin: 'http://example.com', // 허용할 도메인 주소
//     optionsSuccessStatus: 200 // 응답 상태 코드
//   })
// );

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY,
//       name TEXT,
//       age INTEGER,
//     )
//   `);

//   db.run("INSERT INTO users (name, age) VALUES (?, ?)", ['Sang Joon', 47]);
//   db.run("INSERT INTO users (name, age) VALUES (?, ?)", ['Eun Jung', 46]);
//   db.run("INSERT INTO users (name, age) VALUES (?, ?)", ['Na Yoon', 13]);
//   db.run("INSERT INTO users (name, age) VALUES (?, ?)", ['So Yoon', 10]);
// });

// app.get('/api/users', (req, res) => {
//   db.all("SELECT * FROM users", (err, rows) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(rows);
//     }
//   });
// });

// GET /api/users 요청에 대한 처리
app.get('/api/users', (req, res) => {
  database.getUsers((err, users) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(users);
    }
  });
});

// POST /api/users 요청에 대한 처리
app.post('/api/users', (req, res) => {
  const { name, age } = req.body;
  // console.log(req.body);
  
  database.addUser(name, age, (err, userId) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error 서버에러' });
    } else {
      res.json({ id: userId });
    }
  });
});

// // POST /api/users 요청에 대한 처리
// app.post('/api/users', (req, res) => {
//   console.log('req : ',req);
//   db.run("INSERT INTO users (name, age) VALUES (?, ?)", ['John Wick', 10]);
// });

// DELETE /api/users/:id 요청 처리
app.delete('/api/users', (req, res) => {
  const userId = req.params.id;

  // 데이터베이스에서 delete 쿼리 실행
  const query = `DELETE FROM users`;
  db.run(query, userId, function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'User deleted successfully 삭제성공' });
    }
  });
});

app.listen(8000, () => {
  console.log('서버가 8000 포트에서 실행 중입니다.');
});
