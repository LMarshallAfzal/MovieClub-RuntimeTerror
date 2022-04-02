import React from 'react';
import {render, fireEvent,waitForNextUpdate} from "@testing-library/react";
import "@testing-library/jest-dom";
import Logout from "../pages/core/Logout";
import AuthContext from "../components/helper/AuthContext";
import {screen} from '@testing-library/dom'
import {MemoryRouter} from 'react-router-dom'

jest.mock("../components/helper/CsrfToken", () => {
  return {
    __esModule: true,
    default: () => {
      return <></>;
    },
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('Logout', () => {
  let authTokens;
  beforeEach(() => {
    authTokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    }
    render(<AuthContext.Provider value={{authTokens}}>
            <MemoryRouter>

    <Logout />
    </MemoryRouter>

  </AuthContext.Provider>)
      
  });
  
  it('should render the logout form', () => {
    expect(screen.getByText('login')).toBeTruthy()
    expect(screen.getByText('home')).toBeTruthy()
  });
})  