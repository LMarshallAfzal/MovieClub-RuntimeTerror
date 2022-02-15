import React, { useState } from 'react'

export default function Form() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [error, setError] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ''
      || firstName === ''
      || lastName === ''
      || email === ''
      || password === ''
      || passwordConfirmation === '') {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form>
        <label className="label">Username</label>
        <input onChange={handleUsername} className="input"
          value={username} type="text" />
      </form>
    </div>
  )
}
