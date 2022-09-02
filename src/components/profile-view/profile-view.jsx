import React, { useState } from 'react';
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';


export function ProfileView(props) {
  const [user, setUser] = useState({
    Username: props.username,
    Password: props.password,
    Email: props.email,
    Birthday: props.birthday,
    FavoriteMovies: []
  });

  const favoriteMovieList = () => {

  }

  const getUser = () => {

  }

  const handleSubmit = (e) => {

  }

  const removeFav = (id) => {
    //function for remove favorite movie button
  }

  const handleUpdate = (e) => {
    //function for rendering changes

  };



  return (
    <Container>
      <Row>

      </Row>

    </Container>
  );
}