import React,{ useCallback, useEffect, useState } from "react";

const CsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");

  // Code snippet to retrieve token from cookie
  // https://docs.djangoproject.com/en/4.0/ref/csrf/
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const fetchCsrf = useCallback(async () => {
    fetch("http://127.0.0.1:8000/csrf/", {
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchCsrf();
    setCsrfToken(getCookie("csrftoken"));
  }, [fetchCsrf]);

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken || ""} />
  );
};

export default CsrfToken;
