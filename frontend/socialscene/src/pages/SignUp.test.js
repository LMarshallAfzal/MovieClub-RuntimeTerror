import React from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

import SignUp from "./SignUp";

describe("Sign up form", () => {
  beforeEach(() => {
    // This loads the sign up screen
    render(<SignUp />);
  });

  test("Username input is changed", () => {
    // This clicks on the username input, and changes the username
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput.value).toBe("@johndoe"); // before
    fireEvent.change(usernameInput, { target: { value: "@janedoe" } });
    expect(usernameInput.value).toBe("@janedoe"); // after
  });

  // Do we care about HTML form validation
  // to ensure that the entered data
  // is in the proper format?

  // Testing calls to the actual API is unreliable,
  // consider mocking API calls with expected responses

  // Given valid input data then sign up form is submitted
  // Given empty username then sign up form is not submitted
  // Given non matching passwords then sign up form is not submitted
});
