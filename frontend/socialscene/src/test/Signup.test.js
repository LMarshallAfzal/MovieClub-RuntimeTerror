/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../pages/Signup";



describe("signup", () => {
  test("Username field should have label", () => {
    const view = render(<Signup/>);
    const usernameInputNode = view.getByLabelText("username")
    expect(usernameInputNode.value).toMatch("")
    fireEvent.change(usernameInputNode,{target: {value: "johndoe"}})
    expect(usernameInputNode.value).toMatch("johndoe")
  });

  test("First name field should have label", () => {
    const view = render(<Signup/>);
    const firstNameInputNode = view.getByLabelText("first name")
    expect(firstNameInputNode.value).toMatch("")
    fireEvent.change(firstNameInputNode,{target: {value: "John"}})
    expect(firstNameInputNode.value).toMatch("John")
  });

  test("Last name field should have label", () => {
    const view = render(<Signup/>);
    const lastNameInputNode = view.getByLabelText("last name")
    expect(lastNameInputNode.value).toMatch("")
    fireEvent.change(lastNameInputNode,{target: {value: "Doe"}})
    expect(lastNameInputNode.value).toMatch("Doe")
  });

  test("Email field should have label", () => {
    const view = render(<Signup/>);
    const emailInputNode = view.getByLabelText("password")
    expect(emailInputNode.value).toMatch("")
    fireEvent.change(emailInputNode,{target: {value: 'johndoe@example.com'}})
    expect(emailInputNode.value).toMatch("johndoe@example.com")
  });

  test("Bio field should have label", () => {
    const view = render(<Signup/>);
    const bioInputNode = view.getByLabelText("bio")
    expect(bioInputNode.value).toMatch("")
    fireEvent.change(bioInputNode,{target: {value: 'john doe bio'}})
    expect(bioInputNode.value).toMatch("john doe bio")
  });

  test("Preferences field should have label", () => {
    const view = render(<Signup/>);
    const preferencesInputNode = view.getByLabelText("preferences")
    expect(preferencesInputNode.value).toMatch("")
    fireEvent.change(preferencesInputNode,{target: {value: 'Movies'}})
    expect(preferencesInputNode.value).toMatch("Movies")
  });

  test("Password field should have label", () => {
    const view = render(<Signup/>);
    const passwordInputNode = view.getByLabelText("password")
    expect(passwordInputNode.value).toMatch("")
    fireEvent.change(passwordInputNode,{target: {value: 'Password123'}})
    expect(passwordInputNode.value).toMatch("Password123")
  });

  test("Password Confirmation field should have label", () => {
    const view = render(<Signup/>);
    const passwordConfirmationInputNode = view.getByLabelText("password confirmation")
    expect(passwordConfirmationInputNode.value).toMatch("")
    fireEvent.change(passwordConfirmationInputNode,{target: {value: 'Password123'}})
    expect(passwordConfirmationInputNode.value).toMatch("Password123")
  });

  test("Should render a sign up button with class formButton", () =>  {
    const view = render(<Signup/>);
    const signUpButtonNode = view.getByTestId('100')
    expect(signUpButtonNode).toHaveClass('form-button')
  });
}); 