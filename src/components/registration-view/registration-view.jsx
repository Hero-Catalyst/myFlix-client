import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';


export function RegistrationView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  //creating validation
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
  });

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({
        ...values, usernameErr:
          'Username is required'
      });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values, usernameErr:
          'Username must be 5 characters long'
      });
      isReq = false;
    }
    if (!password) {
      setValues({
        ...values, passwordErr:
          'Password is required'
      });
      isReq = false;
    } else if (password.length < 8) {
      setValues({
        ...values, passwordErr:
          'Password must be 8 characters long'
      });
      isReq = false;
    }
    if (!email) {
      setValues({
        ...values, emailErr:
          'Email is required'
      })
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({
        ...values, emailErr:
          'Email is not valid'
      });
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
      axios.post('https://myflix-movieapi-76028.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self'); //the second argument '_self' is necessary so that the page will open in curent tab
        })
        .catch(response => {
          console.log('error registering the user');
          alert('unable to register');
        });
    }
  };


  return (

    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Welcome to the myFlix App! Please Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter a username here"
                      value={username}
                      onChange={e => setUsername(e.target.value)} />

                    {/* code added here to display validation error */}
                    {values.usernameErr && <p>{values.usernameErr}</p>}


                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Your password must be 8 or more characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)} />

                    {/* code added here to display validation error */}
                    {values.passwordErr && <p>{values.passwordErr}</p>}

                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Enter your email address here"
                      onChange={e => setEmail(e.target.value)} />

                    {/* code added here to display validation error */}
                    {values.emailErr && <p>{values.emailErr}</p>}

                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" onClick={handleSubmit}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}


RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),

};