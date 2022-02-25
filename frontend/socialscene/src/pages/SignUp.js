import { Fragment, useState } from "react";

const SignUp = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    preferences: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) =>
    setFormInput({ ...formInput, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    // This prevents refreshing
    // whole page every time
    // button is clicked
    e.preventDefault();
    // Consider handling exceptions?
    fetch("http://127.0.0.1:8000/sign_up/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formInput),
    }).then((response) => response.json()); // Is this necessary?
  };

  return (
    <Fragment>
      <h1>Sign up</h1>
      <p>Here goes the sign up form...</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={formInput.username}
            name="username"
            onChange={handleChange}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            value={formInput.first_name}
            name="first_name"
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={formInput.last_name}
            name="last_name"
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formInput.email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <input
            type="text"
            value={formInput.bio}
            name="bio"
            onChange={handleChange}
          />
        </label>
        <label>
          Preferences:
          <input
            type="text"
            value={formInput.preferences}
            name="preferences"
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formInput.password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <label>
          Password Confirmation:
          <input
            type="password"
            value={formInput.password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Sign up" />
      </form>
    </Fragment>
  );
};

export default SignUp;
