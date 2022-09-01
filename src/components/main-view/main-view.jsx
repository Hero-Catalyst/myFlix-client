import React from 'react';
//use axios to fetch movie database
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Button, Container } from 'react-bootstrap';

import { Menubar } from '../navigation/navbar';

//importing view components
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//needs code 
import { DirectorView } from '../director-view/director-view';
//needs code 
import { GenreView } from '../genre-view/genre-view';
//needs code 
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';



export class MainView extends React.Component {

  constructor() {
    //Super calls the parent "React.Component", which will give the class the actual React compnonent's features
    //Also initializes the component's "this" variable - super is mandatory for including "constructor()" method in component
    super();
    //Code executed right when the component is created in memory - happens before "render"
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the 'user'
 property in state to that *particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { movies, user } = this.state;


    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Menubar user={user} />
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            //If there is no user, the LoginView is rendered.  If there is a user logged in, the 
            //user details are *passed as a prop to the LoginView
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            // Before the movies have been loaded
            if (movies.length === 0) return <div className="main-view" />;

            return (
              movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            );
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (
              <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            );
          }} />


          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route exact path="/genres/:_id" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path={`/users/:Username`} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return <Col>
              <ProfileView user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />


          <Route path={`/user-update/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            return (
              <Col>
                <UserUpdate user={user} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

        </Row>
      </Router>
    );
  }

}


