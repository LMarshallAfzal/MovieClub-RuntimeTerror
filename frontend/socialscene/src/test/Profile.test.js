import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import Profile from "../pages/Profile";

describe("Profile", () => {
  const fakeFetch = {
    get: jest.fn(() => Promise.resolve({"username":"Leodoe","first_name":"Leo","last_name":"Doe","email":"ld@example.org","bio":"bio","preferences":"Action"}))
  };

  const fakeUser = {
    username: "johndoe",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.org",
    bio: "I am johndoe",
    preferences: "Action"
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });

  test("Should call localStorage getItem on render", () => {
    render(<Profile fetch={fakeFetch} />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
});  

