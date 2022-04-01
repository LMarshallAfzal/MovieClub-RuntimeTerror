import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  fireEvent,
  render,
  screen,
  waitForNextUpdate,
} from "@testing-library/react";

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
  // This stubs a
  // successful response
  const responseOk = (status = 200, body = {}) =>
    Promise.resolve({
      ok: true,
      status,
      json: () => Promise.resolve(body),
    });

  // This stubs a
  // client error response
  const responseError = (status = 400, body = {}) =>
    Promise.resolve({
      ok: false,
      status,
      json: () => Promise.resolve(body),
    });

  let loginUser;

  beforeEach(() => {
    // This mocks the
    // fetch function
    jest.spyOn(window, "fetch");
    // This mocks the
    // loginUser function
    loginUser = jest.fn();
    // This loads the
    // sign up screen
    render(
      <AuthContext.Provider
        value={{
          loginUser,
          setLoginCredentials: jest.fn(),
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

  test("All other necessary fields exist", () => {
    expect(
      screen.getByRole("textbox", { name: /first.name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /last.name/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /bio/i })).toBeInTheDocument();
    expect(screen.getByTestId(/preference/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password.confirm/i)).toBeInTheDocument();
  });

  test("Username input is changed", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toHaveValue(""); // before
    fireEvent.change(usernameInput, { target: { value: "@johndoe" } });
    expect(usernameInput).toHaveValue("@johndoe"); // after
  });

  // TODO(1)
  test("All other inputs are changed", () => {});

  // Do we care about HTML form validation
  // to ensure that the entered data
  // is in the proper format?

  test("Given empty input data when sign up form is submitted then empty request body is sent", () => {
    // Empty input
    // Mocked fetch function
    // with stubbed server response
    window.fetch.mockReturnValue(responseError());

    const submitButton = screen.getByRole("button", { name: /sign.up/i });
    userEvent.click(submitButton);

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sign_up/",
      expect.any(Object)
    );
    expect(JSON.parse(window.fetch.mock.calls[0][1].body)).toMatchObject({
      ["username"]: "",
      ["first_name"]: "",
      ["last_name"]: "",
      ["email"]: "",
      ["bio"]: "",
      ["preferences"]: "",
      ["password"]: "",
      ["password_confirmation"]: "",
    });
  });

  test("Given empty input data when sign up form is submitted then user is not logged in", () => {
    // Empty input
    // Mocked fetch function
    // with stubbed server response
    window.fetch.mockReturnValue(responseError());

    const submitButton = screen.getByRole("button", { name: /sign.up/i });
    userEvent.click(submitButton);

    expect(loginUser).not.toHaveBeenCalled();
  });

  // TODO(2): Remove:
  // console.log
  //   []
  //   at submitSignupForm (src/pages/root/Signup.js:128:17)
  // TODO(3): Resolve:
  // console.error
  //   Warning: An update to Signup inside a test was not wrapped in act(...).

  //   When testing, code that causes React state updates should be wrapped into act(...):

  //   act(() => {
  //     /* fire events that update state */
  //   });
  //   /* assert on the output */

  //   This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
  //       at Signup (MovieClub-RuntimeTerror/frontend/socialscene/src/pages/root/Signup.js:12:44)

  //   73 |         if((Object.keys(data)).includes('username')) {
  //   74 |             setUsernameError(true)
  // > 75 |             setUsernameErrorText("Error:" + data.username)
  //      |             ^
  test("Given empty input data when sign up form is submitted then error message is shown", async () => {
    // Empty input
    // Mocked fetch
    // function with
    // stubbed server response
    window.fetch.mockReturnValue(
      responseError(469, {
        username: "Error text...",
        first_name: "Error text...",
        last_name: "Error text...",
        email: "Error text...",
        bio: "Error text...",
        preferences: "Error text...",
        password: "Error text...",
        password_confirmation: "Error text...",
      })
    );

    const submitButton = screen.getByRole("button", { name: /sign.up/i });
    await userEvent.click(submitButton);

    await Promise.resolve().then();
    await waitForNextUpdate;
    // Be sure to use getByText
    // instead of findByText to
    // avoid overlapping act() calls
    const errors = screen.getAllByText(/error/i);
    expect(errors.length).toBeGreaterThanOrEqual(1); // or toHaveLength(8)
  });

  // TODO(4): Extract this ginormous test into more concise parts
  test("Given valid input data when sign up form is submitted then no error message is shown", async () => {
    fireEvent.change(screen.getByTestId(/username/i), {
      target: { value: "@janedoe" },
    });
    fireEvent.change(screen.getByTestId(/first.name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByTestId(/last.name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId(/email/i), {
      target: { value: "janedoe@example.org" },
    });
    fireEvent.change(screen.getByTestId(/bio/i), {
      target: { value: "The quick brown fox jumps over the lazy dog." },
    });
    fireEvent.change(screen.getByTestId(/preference/i), {
      target: { value: "Romance" },
    });
    fireEvent.change(screen.getByTestId(/^password$/i), {
      target: { value: "Password123" },
    });
    fireEvent.change(screen.getByTestId(/password.confirm/i), {
      target: { value: "Password123" },
    });
    // Mocked fetch function
    // with stubbed server response
    window.fetch.mockReturnValue(responseOk(201, {}));

    const submitButton = screen.getByRole("button", { name: /sign.up/i });
    await userEvent.click(submitButton);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sign_up/",
      expect.any(Object)
    );
    expect(screen.getByTestId(/username/i)).toHaveValue("@janedoe");
    expect(screen.getByTestId(/first.name/i)).toHaveValue("Jane");
    expect(screen.getByTestId(/last.name/i)).toHaveValue("Doe");
    expect(screen.getByTestId(/email/i)).toHaveValue("janedoe@example.org");
    expect(screen.getByTestId(/bio/i)).toHaveValue(
      "The quick brown fox jumps over the lazy dog."
    );
    expect(screen.getByTestId(/preference/i)).toHaveValue("Romance");
    expect(screen.getByTestId(/^password$/i)).toHaveValue("Password123");
    expect(screen.getByTestId(/password.confirm/i)).toHaveValue("Password123");
    expect(JSON.parse(window.fetch.mock.calls[0][1].body)).toMatchObject({
      ["username"]: "@janedoe",
      ["first_name"]: "Jane",
      ["last_name"]: "Doe",
      ["email"]: "janedoe@example.org",
      ["bio"]: "The quick brown fox jumps over the lazy dog.",
      ["preferences"]: "Romance",
      ["password"]: "Password123",
      ["password_confirmation"]: "Password123",
    });
    await Promise.resolve().then();
    await waitForNextUpdate;
    expect(loginUser).toHaveBeenCalled();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});