import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3600/login', {
        username: username,
        password: password
      });

      // Assuming your server responds with the access token in response.data.accessToken
      const accessToken = response.data.accessToken;

      // Store the access token in localStorage
      localStorage.setItem('accessToken', accessToken);

      // Optionally, you can also set it in sessionStorage
      // sessionStorage.setItem('accessToken', accessToken);

      console.log('Logged in successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <p>Pre Login</p>
      <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} /><br />
      <input type='text' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default App;