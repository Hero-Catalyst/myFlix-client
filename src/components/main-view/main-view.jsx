import React from 'react';
//use axios to fetch movie database
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import { Row, Col, Button, Container } from 'react-bootstrap';

import MenuBar from '../navigation/navbar';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
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

  //get request for movies list from heroku
  //I'm not positive I need this now...
  /*componentDidMount() {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
  }*/

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

  /*When a movie is clicked, this function is invoked and updates the 
  state of the `selectedMovie` *property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }*/

  //When a user registers
  /*onRegistration(register) {
    this.setState({
      register
    });
  }*/


  //Logging out user
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <MenuBar user={user} />
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            //If there is no user, the LoginView is rendered.  If there is a user logged in, the 
            //user details are *passed as a prop to the LoginView
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
            // Before the movies have been loaded
            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack()} />
            </Col>;
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.goBack()} />
            </Col>;
          }} />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()} />
            </Col>;
          }} />

          <Route path='/users/:username' render={({ history, match }) => {
            if (!user) return
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            if (movies.length === 0) return <div className="main-view" />
            return
            <ProfileView history={history} movies={movies} user={user === match.params.username} />
          }} />


          <Route path={`/user-update/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            return <Col>
              <UserUpdate user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }

}


