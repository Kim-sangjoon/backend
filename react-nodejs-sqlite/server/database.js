// database.js 파일

const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결 설정
const db = new sqlite3.Database('./data.db');



// 데이터베이스 작업을 위한 함수 정의
const getUsers = (callback) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const addUser = (name, age, callback) => {
  db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age], function (err) {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, this.lastID);
    }
  });
};


module.exports = {
  getUsers,
  addUser
};
