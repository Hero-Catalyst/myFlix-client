import React from 'react';
//use axios to fetch movie database
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


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

  //get request for movies list from heroku
  componentDidMount() {
    axios.get('https://myflix-movieapi-76028.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
  }

  /*When a movie is clicked, this function is invoked and updates the 
  state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the 'user'
  property in state to that *particular user */
  onLoggedIn(user) {
    this.setState({
      user
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;

    /* If there is no user, the LoginView is rendered.  If there is a 
    user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <div className="main-view">
        {/*If the state of 'selectedMovie' is not null, that selected movie
        will be returned. Otherwise, all *movies will be returned*/}
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={
            newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }} />

          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie)
            }} />
          ))
        }
      </div>
    );
  }

}


