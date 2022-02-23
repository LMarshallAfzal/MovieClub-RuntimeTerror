import React, { Component} from 'react';

class Login extends Component {

  state = {
    credentials: {username: '', password: ''}
  }

  // login = event => {
  //   fetch('http://127.0.0.1:8000/auth/', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(this.state.credentials)
  //   })
  //   .then(data => data.json())
  //   .then(
  //     data => {
  //       this.props.userLogin(data.token);
  //     }
  //   )
  //   .catch( error => console.error(error))
  // }

  login = event => {
    console.log(this.state.credentials)
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then(data => data.json())
    .then(
      data => {
        this.props.userLogin(data.token)
      }
    )
    .catch(error => console.error(error))
    fetch('http://127.0.0.1:8000/user/' + this.state.credentials.username + '/', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(data => data.json())
    .then(data => console.log(data))
    // .then(data => localStorage.setItem('user', JSON.stringify(data.first_name)))
    .catch(error => console.error(error))
    this.setState({
      username:'',
      first_name:'',
      last_name:'',
      email:'',
      bio:'',
      preferences:'',
      password:'',
      password_confirmation:''
  })

  // localStorage.setItem('user', JSON.stringify(this.state))
  }

  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  render() {
    return (
      <div>
        <h1>Login user form</h1>

        <label>
          Username:
          <input type="text" name="username"
           value={this.state.credentials.username}
           onChange={this.inputChanged}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" name="password"
           value={this.state.credentials.password}
           onChange={this.inputChanged} />
        </label>
        <br/>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default Login;