import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import CsrfToken from "../components/CsrfToken";

const LogIn = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormInput({ ...formInput, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    // This prevents refreshing
    // whole page every time
    // button is clicked
    e.preventDefault();
    fetch("http://127.0.0.1:8000/log_in/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(formInput),
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          throw new Error("Something went wrong...");
        } else {
          // This redirects to home page
          // upon successful log in
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <h1>Log in</h1>
      <p>Here goes the log in form...</p>
      {error && <span>Something went wrong...</span>}
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
          Password:
          <input
            type="password"
            value={formInput.password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <CsrfToken />
        <input type="submit" value="Log in" />
      </form>
    </Fragment>
  );
};

export default LogIn;