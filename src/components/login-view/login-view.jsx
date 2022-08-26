//Hook
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { RegistrationView } from '../registration-view/registration-view';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Component
export function LoginView(props) {
  //Calling the useState method with initial value(''), method returns destructured pair values
  //Assigns current state value ('') to username, and assigns method that updates username to setUsername
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    //(e) prevents the default refresh/change of the page from the handleSubmit() method
    e.preventDefault();
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
  };

  return (

    <Form>
      <Form.Group contolId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
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
