import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import LogIn from "./LogIn";

// This is mocks the
// useNavigate() function
// Why mock must be appended?
const mockNavigate = jest.fn();
// This code snippet must
// be placed outside of describe
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Log in form", () => {
  let fetchMock;

  beforeEach(() => {
    // This loads the
    // log in screen
    render(<LogIn />);
    // This mocks a
    // fetch function
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

  test("Given invalid input data when log in form is submitted then err_msg", () => {
    // Empty input...

    const submitButton = screen.getByText(/log in/i, { selector: "input" });
    userEvent.click(submitButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/log_in/",
      expect.any(Object)
    );
    waitFor(() => expect(screen.findByText(/wrong/i)).toBeInTheDocument());
  });

  test("Given valid input data when log in form is submitted then redirect", () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "@janedoe" },
    });
    fireEvent.change(screen.getByLabelText("Password:"), {
      target: { value: "Password123" },
    });

    const submitButton = screen.getByText(/log in/i, { selector: "input" });
    userEvent.click(submitButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/log_in/",
      expect.any(Object)
    );
    waitFor(() => expect(screen.queryByText(/wrong/i)).not.toBeInTheDocument());
  });
});
