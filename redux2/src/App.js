import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(null); // Initialize the accessToken state

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3600/login', {
        username: username,
        password: password
      });

      // Assuming your server responds with the access token in response.data.accessToken
      const token = response.data.accessToken;


      // Set the access token in memory (in the accessToken state)
      setAccessToken(token);

      console.log('Logged in successfully');
	  console.log(token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    // Clear the access token from memory (set it to null)
    setAccessToken(null);
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Pre Login</p>
          <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} /><br />
          <input type='text' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Log in</button>
        </div>
      )}
    </div>
  );
};

export default App;
