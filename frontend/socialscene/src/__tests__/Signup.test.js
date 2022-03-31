import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Signup from "../pages/core/Signup";
import AuthContext from "../components/helper/AuthContext";

// This mocks the
// <CsrfToken /> component
jest.mock("../components/helper/CsrfToken", () => {
  return {
    __esModule: true,
    default: () => {
      return <></>;
    },
  };
});

// This mocks the
// useNavigate function
// Why "mock*" must be appended?
const mockNavigate = jest.fn();
// This code snippet must
// be placed outside of describe(...)
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Sign up form", () => {
  let fetchMock;

  beforeEach(() => {
    // This mocks the
    // fetch function
    fetchMock = jest
      .spyOn(window, "fetch")
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      );
    // This loads the
    // sign up screen
    render(
      <AuthContext.Provider
        value={{
          loginUser: jest.fn(),
          logoutUser: jest.fn(),
        }}
      >
        <Signup />
      </AuthContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("Username field exists", () => {
    expect(
      screen.getByRole("textbox", { name: /username/i })
    ).toBeInTheDocument();
  });

  test("Username input is changed", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toHaveValue(""); // before
    fireEvent.change(usernameInput, { target: { value: "@johndoe" } });
    expect(usernameInput).toHaveValue("@johndoe"); // after
  });

  // Do we care about HTML form validation
  // to ensure that the entered data
  // is in the proper format?

  test.skip("Given invalid input data when sign up form is submitted then error message is shown", () => {
    // Empty input...

    const submitButton = screen.getByRole("button", { name: /sign.up/i });
    userEvent.click(submitButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sign_up/",
      expect.any(Object)
    );
    waitFor(() => expect(screen.findByText(/error/i)).toBeInTheDocument());
  });

  test.skip("Given valid input data when sign up form is submitted then no error message is shown", () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "@janedoe" },
    });
    fireEvent.change(screen.getByLabelText(/first.name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/last.name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "janedoe@example.org" },
    });
    fireEvent.change(screen.getByLabelText(/bio/i), {
      target: { value: "The quick brown fox jumps over the lazy dog." },
    });
    fireEvent.change(screen.getByLabelText(/preferences/i), {
      target: { value: "Romance" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password123" },
    });
    fireEvent.change(screen.getByLabelText(/password.confirm/i), {
      target: { value: "Password123" },
    });

    const submitButton = screen.getByRole("button", { name: /sign.up/i });
    userEvent.click(submitButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sign_up/",
      expect.any(Object)
    );
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});