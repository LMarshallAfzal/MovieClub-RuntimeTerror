/* eslint-disable testing-library/prefer-screen-queries */
import React, {useContext} from 'react';
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../pages/core/Signup";
import AuthContext from "../components/helper/AuthContext";
import {MemoryRouter} from 'react-router-dom'
import user from '@testing-library/user-event';
// import { check } from 'prettier';



function renderAuthContext(authTokens) {
  return render (
    <AuthContext.Provider value={{authTokens}}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </AuthContext.Provider> 
  )
}

describe('Signup', () => {
  let authTokens;
  beforeEach(() => {
    authTokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    }
  }
  )
  it('should render the signup page', () => {
    const {getByText} = renderAuthContext(authTokens);
    expect(getByText('sign up')).toBeInTheDocument();

  })

  it('should render the signup form', () => {
    const {getByTestId} = renderAuthContext(authTokens);
    expect(getByTestId('username-field')).toBeInTheDocument();
    expect(getByTestId('first-name-field')).toBeInTheDocument();
    expect(getByTestId('last-name-field')).toBeInTheDocument();
    expect(getByTestId('email-field')).toBeInTheDocument();
    expect(getByTestId('bio-field')).toBeInTheDocument();
    expect(getByTestId('preferences-field')).toBeInTheDocument();
    expect(getByTestId('password-field')).toBeInTheDocument();
    expect(getByTestId('password-confirmation-field')).toBeInTheDocument();
  })

})