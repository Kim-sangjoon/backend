// src/App.js

import React, { useEffect, useState } from 'react';


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://172.30.1.40:8000/api/users')
    // fetch('http://localhost:8000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, [users]);

  const selectUser = async () => {
    fetch('http://172.30.1.40:8000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
    }
  
  
  const hendleDelUser = (params) => {
    deleteUser(params);
  }
    
  const deleteUser = async () => {
    try {
      const response = await fetch(`http://172.30.1.40:8000/api/users`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('API 요청 실패');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    const name = 'John Wick';
    const age = '99';
  
    try {
      const response = await fetch('http://172.30.1.40:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age })
      });
  
      if (!response.ok) {
        throw new Error('API 요청 실패');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.age}</li>
        ))}
      </ul>
      <button onClick={addUser}>추가</button>
      <button onClick={hendleDelUser}>모두삭제</button>
      <button onClick={selectUser}>검색</button>
    </div>
  );
}

export default App;
