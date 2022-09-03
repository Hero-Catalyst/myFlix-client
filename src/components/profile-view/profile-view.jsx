import React, { useState } from 'react';
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';


export function ProfileView() {
  //HOOK useState
  const [user, setUser] = useState("");

  //METHODS
  const getUser = (token) => {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/users/:Username', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const favoriteMovieList = () => {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/users/:Username/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleUpdate = (e) => {
    const name = e.user.Username;
    setUser
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
              value={user.Username}
              onChange={handleUpdate}
            />
            <Col>
              <label>Change Password: </label>
              <input
                type="text"
                name="password"
                value={user.Password}
                onChange={handleUpdate}
              />
            </Col>
            <Col>
              <label>Change Email: </label>
              <input
                type="email"
                name="email"
                value={user.Email}
                onChange={handleUpdate}
              />
            </Col>
            <Col>
              <label>Change Birthday: </label>
              <input
                type="date"
                name="birthday"
                value={user.Birthday}
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