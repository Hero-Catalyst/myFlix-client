import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';

//import UserInfo from './user-info';
//import FavoriteMovies from './favorite-movies';
//import UpdateUser from './update-user';


export function ProfileView() {
  //HOOK useState
  const [user, setUser] = useState('');



  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  //METHODS
  const getUser = (token, user) => {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/users/${user}', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        //Assign the result to the state
        console.log(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  //Calling the hook function on render. Empty array as 2nd argument so the call will only run once on each render
  useEffect(() => {
    getUser(token, currentUser);
  }, []);

  //This needs to be updated and called
  const favoriteMovieList = () => {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/users/${user}/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your info has changed');
  }

  const handleUpdate = (e) => {
    const name = e.target.user;
    const value = e.target.value;
    setUser(values => ({ ...values, [user]: value }))
  }

  const removeFav = (id) => {
    //function for remove favorite movie button
  };



  return (
    <Container>

      <Row>

        <Col>
          <form onSubmit={handleSubmit}>
            <h1>Need to make some changes?</h1>

            <label>Change Username: </label>
            <input
              type="text"
              name="username"
              value={user}
              onChange={handleUpdate}
            />
            <Col>
              <label>Change Password: </label>
              <input
                type="password"
                name="password"
                onChange={handleUpdate}
              />
            </Col>
            <Col>
              <label>Change Email: </label>
              <input
                type="email"
                name="email"
                onChange={handleUpdate}
              />
            </Col>
            <Col>
              <label>Change Birthday: </label>
              <input
                type="date"
                name="birthday"
                onChange={handleUpdate}
              />
            </Col>
            <Button className="primary" type="submit">Submit</Button>
          </form>
        </Col>
      </Row>
    </Container >
  );
}