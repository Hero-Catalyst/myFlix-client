import React from 'react';
//use axios to fetch movie database
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

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
      selectedMovie: null,
      user: null
    };
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


  //get request for movies list from heroku
  //I'm not positive I need this now...
  componentDidMount() {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
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

  /*When a movie is clicked, this function is invoked and updates the 
  state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  //When a user registers
  /*onRegistration(register) {
    this.setState({
      register
    });
  }*/

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


  //Logging out user
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered.  If there is a 
    user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view"></div>;

    //if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />

    return (
      <Router>
        <div className="mainview">
          <Route exact path="/" render={welcome} />
          <Route exact path="/movies/:movieId" render={movie - view} />
          <Route exact path="/genres/:name" render={genre - view} />
          <Route exact path="/directors/:name" render={director - view} />
        </div>
      </Router>

      /*<Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />

          <Button onClick={() => { this.onLoggedOut() }}> Logout</Button >
        </Row>
      </Router>*/
    );
  }

}


