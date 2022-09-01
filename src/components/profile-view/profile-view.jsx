import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';


export function ProfileView({ moves, onUpdatedUserInfo }) {
  const [user, setUser] = useState({})





  render() {



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
}