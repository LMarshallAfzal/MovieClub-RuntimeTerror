import React, { useContext } from 'react';
import TestRenderer from 'react-test-renderer';
import { AuthProvider, AuthContext } from '../components/helper/AuthContext';
import fetchMock from 'jest-fetch-mock';
import Login from "../pages/core/Login";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitForNextUpdate } from "@testing-library/react";
import App from "../pages/core/App";




const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ accessToken: 'accessToken', refreshToken: 'refreshToken' }) })
);

describe("Authentication", () => {
  const responseOk = (status = 200, body = {}) =>
    Promise.resolve({
      ok: true,
      status,
      json: () => Promise.resolve(body),
    });

  const responseErrorUnauthorized = (status = 401, body = {}) =>
    Promise.resolve({
      ok: false,
      status,
      json: () => Promise.resolve(body),
    });

  let loginUser;

  beforeEach(() => {
    jest.spyOn(window, "fetch");
    loginUser = jest.fn();
    render(
      <AuthProvider values={{ loginUser, setLoginCredentials: jest.fn(), }} authTokens={{ accessToken: 'accessToken', refreshToken: 'refreshToken' }}>
        <App />
      </AuthProvider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });


  it.skip("should raise error with invalid data", async () => {
    window.fetch.mockReturnValue(responseErrorUnauthorized(469, {
      username: "Error text...",
      password: "Error text...",
    }));
    render(
      <AuthProvider values={{ loginUser, setLoginCredentials: jest.fn(), }} authTokens={{ accessToken: 'accessToken', refreshToken: 'refreshToken' }}>
        <App />
      </AuthProvider>
    );


    expect(window.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/token/refresh/",
      expect.any(Object)
    );
    await Promise.resolve().then();
    await waitForNextUpdate;
  });

  it.skip("should login user with correct credentials", async () => {
    window.fetch.mockReturnValue(responseOk(200, {
      username: "test",
      password: "test",

    }));
    render(
      <AuthProvider values={{ loginUser, setLoginCredentials: jest.fn(), }} authTokens={{ accessToken: 'accessToken', refreshToken: 'refreshToken' }}>
        <App />
      </AuthProvider>
    );

    await loginUser
    expect(window.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/token/refresh/",
      expect.any(Object)
    );
  });

  it.skip("should not login user with empty details", async () => {
    window.fetch.mockReturnValue(responseErrorUnauthorized());

    render(

      <AuthProvider values={{ loginUser, setLoginCredentials: jest.fn(), }} authTokens={{ accessToken: 'accessToken', refreshToken: 'refreshToken' }}>
        <App />
      </AuthProvider>

    );

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/token/refresh/",
      expect.any(Object)
    );

  });

  it.skip("should not login user with invalid credentials", async () => {
    window.fetch.mockReturnValue(responseErrorUnauthorized(401, {
      username: "Error text...",
      password: "Error text...",
    }));

    render(
      <AuthProvider values={{ loginUser, setLoginCredentials: jest.fn(), }} authTokens={{ accessToken: 'accessToken', refreshToken: 'refreshToken' }}>
        <App />
      </AuthProvider>
    );

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/token/refresh/",
      expect.any(Object))

     });  


});






