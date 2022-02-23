import { Fragment, useState } from "react";

const SignUp = () => {
  const [formInput, setFormInput] = useState({
    // Values are pre-filled
    // for testing purposes
    // otherwise set to ""
    username: "@johndoe",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.org",
    bio: "The quick brown fox jumps over the lazy dog.",
    preferences: "Action, Drama, Horror, Comedy, Science fiction",
    password: "Password123",
    password_confirmation: "Password123",
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
            defaultValue={formInput.username}
            onChange={handleChange}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            defaultValue={formInput.first_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            defaultValue={formInput.last_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            defaultValue={formInput.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <input
            type="text"
            defaultValue={formInput.bio}
            onChange={handleChange}
          />
        </label>
        <label>
          Preferences:
          <input
            type="text"
            defaultValue={formInput.preferences}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            defaultValue={formInput.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Password Confirmation:
          <input
            type="password"
            defaultValue={formInput.password_confirmation}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Sign up" />
      </form>
    </Fragment>
  );
};

export default SignUp;
