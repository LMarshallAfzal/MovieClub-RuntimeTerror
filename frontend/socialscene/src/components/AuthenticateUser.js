import React, {useState} from "react"
import PropTypes from "prop-types"

async function LoginUser(credentials) {
    return fetch('http://127.0.0.1:8000/log_in/', {
        method:'POST',
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(credentials)
    })
        .then(response=>response.json())
        .then((data)=>console.log(data))
}

export default function AuthUser({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await LoginUser({
        username,
        password
      });
      setToken(token);
    }
  
    return(
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
  
  AuthUser.propTypes = {
    setToken: PropTypes.func.isRequired
  };