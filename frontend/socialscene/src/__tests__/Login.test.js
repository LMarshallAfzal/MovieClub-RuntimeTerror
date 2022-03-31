/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/root/Login";
import AuthContext from "../components/helper/AuthContext";
import {screen} from '@testing-library/dom'

function RenderAuthContext(authTokens, loginCredentials) {
  return render (
    <AuthContext.Provider value={{authTokens, loginCredentials}}>
      <Login />
    </AuthContext.Provider> 
  )
}

describe('Login', () => {
  let authTokens;
  let loginCredentials = jest.fn();
  beforeEach(() => {
    authTokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    }

    loginCredentials = {
      username: 'johndoe', 
      password: 'Password123'
    }
  }
  )
  it('should render the login page', () => {
    const {getByRole} = RenderAuthContext(authTokens, loginCredentials);
    expect(getByRole('heading', {name: /log in./i})).toBeInTheDocument();
  })
  it('should render the login form', () => {
    const {getByTestId} = RenderAuthContext(authTokens, loginCredentials);
    expect(getByTestId('username-field')).toBeInTheDocument();
    expect(getByTestId('password-field')).toBeInTheDocument();
  })
  it('should render the login button', () => {
    const {getByRole} = RenderAuthContext(authTokens, loginCredentials);
    expect(getByRole('button',{name: /log in/i})).toBeInTheDocument();
  })
})  