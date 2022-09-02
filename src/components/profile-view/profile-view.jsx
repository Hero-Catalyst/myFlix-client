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

  const getUser = () => {
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

      </Row>

    </Container>
  );
}