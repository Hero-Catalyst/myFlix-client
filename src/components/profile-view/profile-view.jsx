import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";
import { object } from "prop-types";

//Importing Components
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

//Component Start
export function ProfileView(props) {
  //HOOK useState
  const { movies } = props;

  const [user, setUser] = useState("");

  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  //METHODS
  const getUser = (token, user) => {
    axios.get(`https://myflix-movieapi-76028.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        //Assign the result to the state
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

  const handleUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }))
  };





  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-white text-center">Hello {currentUser}!</h1>
          <h3 className="text-white text-center"> {user.Email}</h3>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4 className="text-white text-center py-5">
            Feel free to update your information:{" "}
          </h4>
          <UpdateUser user={user} />
        </Col>
      </Row>

      <Row>
        <Col>
          <h4 className="text-white text-center py-5">
            Your Favorite Movies:
          </h4>
          <FavoriteMovies
            movies={movies}
            favoriteMovies={user.FavoriteMovies ?
              user.FavoriteMovies : []}
          />
        </Col>
      </Row>




    </Container>
  );
}