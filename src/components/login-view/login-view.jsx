//Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Component
export function LoginView(props) {
  //Calling the useState method with initial value(''), method returns destructured pair values
  //Assigns current state value ('') to username, and assigns method that updates username to setUsername
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Decalre hook for each input 
  const [usernameErr, setUsernameErr] = userState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 8) {
      setPassword('Password must be 8 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    //(e) prevents the default refresh/change of the page from the handleSubmit() method
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //Send request to the server for authentication
      axios.post('https://myflix-movieapi-76028.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (

    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username}
          onChange={e => setUsername(e.target.value)} />
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} />
        {/* code added here to display validation error */}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired
};
