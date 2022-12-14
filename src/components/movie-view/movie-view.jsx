import React from 'react';

export class MovieView extends React.Component {

  //Component method that acts as callback function
  /*keypressCallBack(event) {
    console.log(event.key);
  }

  //Adding event listener "keypress"
  componentDidMount() {                   //the callback function from above
    document.addEventListener('keypress', this.keypressCallBack);
  }*/

  //Removing the event listener
  //componentWillUnmount() {
  //document.removeEventListener('keypress', this.keypressCallBack);
  //}

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img crossorigin="anonymous" src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title:</span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description:</span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre:</span>
          <span className="value">{movie.Genre}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director:</span>
          <span className="value">{movie.Director}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}