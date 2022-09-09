import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';



export function UpdateUser(props) {
  const { user } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({
        ...values,
        usernameErr: 'Username must be at tleast 2 characters long',
      });
      isReq = flase;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password required' });
      isReq = false;
    } else if (password.length < 8) {
      setValues({
        ...values,
        passwordErr: 'Password must be at least 8 characters long',
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Enter valid email' });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      const token = localStorage.getItem('token');
      axios.put(`https://myflix-movieapi-76028.herokuapp.com/users/${user.Username}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          console.log(response.data);
          setPassword(response.data.Password);
          setEmail(response.data.Email);
          setBirthday(response.data.Birthday);
          // localStorage.removeItem('user');
          localStorage.setItem('user', username);
          // alert('Profile was successfully updated.');
          window.open(`/users/${username}`, '_self');
        })
        .catch((error) => {
          console.error(error);
          alert('Unable to update profile.')
        });
    }
  };

  /*need movie map
  const fruits = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);
  fruits.set("apples", 500);
fruits.set("bananas", 300);
fruits.set("oranges", 200);
fruits.delete();
  */



  return (
    <Container id='update-form' className='mt-5'>
      <Row>
        <h3 className='mx-auto text-center'>Edit Profile</h3>
      </Row>
      <Row className='text-center'>
        <Col sm='10' md='8' lg='6'>
          <Form className='text-left'>
            <Form.Group controlId='formUsername'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
                required
              />
              {/* display validation error */}
              {values.usernameErr && <p>{values.usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId='formPassword'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
              {/* display validation error */}
              {values.passwordErr && <p>{values.passwordErr}</p>}
            </Form.Group>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='example@preferredemail.com'
                required
              />
              {/* display validation error */}
              {values.emailErr && <p>{values.emailErr}</p>}
            </Form.Group>
            <Form.Group controlId='formBirthday'>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type='text'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder='YYYY-MM-DD'
              />
            </Form.Group>
            <Form.Group controlId='formBirthday' className='mt-3'>
              <Button
                id='open-button'
                variant='warning'
                type='submit'
                onClick={handleSubmit}
              >
                Update profile
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}