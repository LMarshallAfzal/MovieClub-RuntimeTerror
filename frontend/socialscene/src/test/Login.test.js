import React from 'react';
import {render, fireEvent,waitForNextUpdate} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/core/Login";
import AuthContext from "../components/helper/AuthContext";
import {screen} from '@testing-library/dom'
import { act } from 'react-dom/test-utils';
import userEvent from "@testing-library/user-event";
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

describe('Login', () => {
  let authTokens;
  let loginCredentials = jest.fn();
  jest.spyOn(window, "fetch");
  beforeEach(() => {
    authTokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    }
    render(<AuthContext.Provider value={{authTokens, loginCredentials,setLoginCredentials: jest.fn()}}>
            <MemoryRouter>

    <Login />
    </MemoryRouter>

  </AuthContext.Provider>)
      
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  
  
  it('should render the login page', () => {
    expect(screen.getByRole('heading', {name: /log in./i})).toBeInTheDocument();
  });
  it('should render the login form', () => {
    expect(screen.getByTestId('username-field')).toBeInTheDocument();
    expect(screen.getByTestId('password-field')).toBeInTheDocument();
  });
  it('should render the login button', () => {
    expect(screen.getByRole('button',{name: /log in/i})).toBeInTheDocument();
  });

  test("Username input is changed", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toHaveValue(""); // before
    fireEvent.change(usernameInput, { target: { value: "@johndoe" } });
    expect(usernameInput).toHaveValue("@johndoe"); // after
  });

  test("Password input is changed", () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveValue(""); // before
    fireEvent.change(passwordInput, { target: { value: "Password123" } });
    expect(passwordInput).toHaveValue("Password123"); // after
  });

  test("Login button is clicked", async() => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: "@johndoe" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });
    await Promise.resolve().then();
    await waitForNextUpdate;
  });
})  