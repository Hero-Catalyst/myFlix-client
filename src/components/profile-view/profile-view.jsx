import React, { useState } from 'react';
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';
//Import Component files
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';


export function ProfileView() {
  const [user, setUser] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: []
  });

  const favoriteMovieList = () => {
    //function(method)-need to display user favorite movies list 
    axios.get('https://myflix-movieapi-76028.herokuapp.com/users/:Username/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          FavoriteMovies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*const getUser = () => {
    //Getting user from database?  Axios?
    axios.get('https://myflix-movieapi-76028.herokuapp.com/users/:Username', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/

  const handleSubmit = (e) => {
    //write code for submitting changes
    //needs to update state and database
  }

  const removeFav = (id) => {
    //function for remove favorite movie button
  }

  const handleUpdate = (e) => {
    //function for rendering changes
    this.setUser
  };



  return (
    <Container>
      <Row>
        <UserInfo name={user.Username} email={user.Email} />
        <FavoriteMovies favoriteMovieList={favoriteMovieList} />
        <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

      </Row>

    </Container>
  );
}