import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        username: ''
    });

    useEffect(() => {
        axios.get("http://localhost:3003/getUsers")
            .then((response) => {
                setListOfUsers(response.data);
            });
    }, [listOfUsers]);

    const createUser = () => {
        axios.post("http://localhost:3003/createUser", formData)
            .then((response) => {
				alert('user created')
                // Do something with the response if needed
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <div>
                {listOfUsers.map((user, index) => (
                    <div key={index}>
                        <li>Name: {user.name}</li>
                        <li>Age: {user.age}</li>
                        <li>Username: {user.username}</li>
                    </div>
                ))}
            </div>
            <div>
                <br /><br />
                Create User<br />
                Name: <input type='text' name='name' onChange={handleInputChange} /><br />
                Age: <input type='number' name='age' onChange={handleInputChange} /><br />
                Username: <input type='text' name='username' onChange={handleInputChange} />
                <button onClick={createUser}>Create</button>
            </div>
        </>
    );
};

export default App;
