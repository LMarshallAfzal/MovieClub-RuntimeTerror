// import React,{useState} from "react"
// import PropTypes from "prop-types"

// async function LoginUser(credentials) {
//     return fetch('http://127.0.0.1:8000/auth/', {
//         method:'POST',
//         headers:{
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify(credentials)
//     })
//         .then(data=>data.json())
//         .then((data)=>console.log(data))
// }

// export default function AuthenticateUser({ setToken }) {
//     const [username, setUserName] = useState();
//     const [password, setPassword] = useState();

  
//     const handleSubmit = async e => {
//       e.preventDefault();
//       const token = await LoginUser({
//         username,
//         password
//       });
//       setToken(token);
//       if (!token) {
//         console.log("false")
//       }
//     }
  
//     return(
//       <div className="login-wrapper">
//         <form onSubmit={handleSubmit}>
//           <label>
//             <p>Username</p>
//             <input type="text" onChange={e => setUserName(e.target.value)} />
//           </label>
//           <label>
//             <p>Password</p>
//             <input type="password" onChange={e => setPassword(e.target.value)} />
//           </label>
//           <div>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>
//     )
//   }
  
//   AuthenticateUser.propTypes = {
//     setToken: PropTypes.func.isRequired
//   };

import React, { Component} from 'react';

class Login extends Component {

  state = {
    credentials: {username: '', password: ''}
  }

  login = event => {
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        this.props.userLogin(data.token);
      }
    )
    .catch( error => console.error(error))
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