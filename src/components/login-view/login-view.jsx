//Hook
import React, { useState } from 'react';

//Component
export function LoginView(props) {
  //Calling the useState method with initial value(''), method returns destructured pair values
  //Assigns current state value ('') to username, and assigns method that updates username to setUsername
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    //(e) prevents the default refresh/change of the page from the handleSubmit() method
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);  //this allows a user to be logged in regardless of credentials.
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

/* code before implementing the {useState} hook

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    console.log(username, password);
    /* Send a request to the server for authentication
    then call this.props.onLoggedIn(username) 
    // this.props.onLoggedIn(usersname); 
  }

  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" value={this.state.username}
            onChange={this.onUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password}
            onChange={this.onPasswordChange} />
        </label>
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
} */