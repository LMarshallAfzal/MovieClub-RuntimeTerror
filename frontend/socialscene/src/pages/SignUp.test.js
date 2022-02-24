import React from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

import SignUp from "./SignUp";

describe("Sign up form", () => {
  beforeEach(() => {
    // This loads the
    // sign up screen
    render(<SignUp />);
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

  // Given invalid input data when sign up form is submitted then err_msg ?
  // Given valid input data when sign up form is submitted then success_msg ?

  // Which to use -- test or it?
  test("Foo bar baz", () => {
    const fetchMock = jest
      .spyOn(window, "fetch")
      .mockImplementation(() => Promise.resolve({ json: () => {} }));

    // Which to use -- button or input tag?
    const submitButton = screen.getByText(/sign up/i, { selector: "input" });
    // Which to use -- userEvent or fireEvent?
    userEvent.click(submitButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/sign_up/",
      expect.any(Object)
    );
    // expect(screen.findByText(/success/i)).toBeInTheDocument()
  });
});
