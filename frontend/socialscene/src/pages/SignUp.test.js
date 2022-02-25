import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SignUp from "./SignUp";

describe("Sign up form", () => {
  let fetchMock;

  beforeEach(() => {
    // This loads the
    // sign up screen
    render(<SignUp />);
    // This creates a
    // mock function
    fetchMock = jest
      .spyOn(window, "fetch")
      .mockImplementation(() => Promise.resolve({ json: () => {} }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Username input is changed", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput.value).toBe(""); // before
    fireEvent.change(usernameInput, { target: { value: "@johndoe" } });
    expect(usernameInput.value).toBe("@johndoe"); // after
  });

  // Do we care about HTML form validation
  // to ensure that the entered data
  // is in the proper format?

  test("Given invalid input data when sign up form is submitted then err_msg", () => {
    // Empty input...

    const submitButton = screen.getByText(/sign up/i, { selector: "input" });
    userEvent.click(submitButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sign_up/",
      expect.any(Object)
    );
    waitFor(() => expect(screen.findByText(/wrong/i)).toBeInTheDocument());
  });

  test("Given valid input data when sign up form is submitted then success_msg", () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "@janedoe" },
    });
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
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
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Password123" },
    });
    fireEvent.change(screen.getByLabelText("Password Confirmation:"), {
      target: { value: "Password123" },
    });

    const submitButton = screen.getByText(/sign up/i, { selector: "input" });
    userEvent.click(submitButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sign_up/",
      expect.any(Object)
    );
    waitFor(() => expect(screen.queryByText(/wrong/i)).not.toBeInTheDocument());
  });
});
