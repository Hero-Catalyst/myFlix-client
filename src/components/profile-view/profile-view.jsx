import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';
import { object } from 'prop-types';

import UserInfo from './user-info';
//import FavoriteMovies from './favorite-movies';
import { UpdateUser } from './update-user';


export function ProfileView() {
  //HOOK useState
  const [user, setUser] = useState('');

  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  //METHODS
  const getUser = (token, user) => {
    axios.get(`https://myflix-movieapi-76028.herokuapp.com/users/${user}`, {
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
    axios.get(`https://myflix-movieapi-76028.herokuapp.com/users/${user}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setUser.FavoriteMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*const handleUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }*/

  const removeFav = (id) => {
    //function for remove favorite movie button
  };



  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-white text-center py-5'>Hello {currentUser}!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className='text-white text-center py-5'>
            Update your information:{' '}
          </h4>
          <UpdateUser user={user} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className='text-white text-center py-5'>
            TODO Add Favorite Movies
          </h4>
        </Col>
      </Row>
    </Container>
  );
}