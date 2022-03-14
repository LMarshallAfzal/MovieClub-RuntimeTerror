import React from 'react';
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../pages/Signup";
import {MemoryRouter} from 'react-router-dom'

describe("Signup", () => {
  test("Username field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const usernameInputNode = screen.getByLabelText("username")
    expect(usernameInputNode.value).toMatch("")
    fireEvent.change(usernameInputNode,{target: {value: "johndoe"}})
    expect(usernameInputNode.value).toMatch("johndoe")
  });

  test("First name field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const firstNameInputNode = screen.getByLabelText("first name")
    expect(firstNameInputNode.value).toMatch("")
    fireEvent.change(firstNameInputNode,{target: {value: "John"}})
    expect(firstNameInputNode.value).toMatch("John")
  });

  test("Last name field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const lastNameInputNode = screen.getByLabelText("last name")
    expect(lastNameInputNode.value).toMatch("")
    fireEvent.change(lastNameInputNode,{target: {value: "Doe"}})
    expect(lastNameInputNode.value).toMatch("Doe")
  });

  test("Email field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const emailInputNode = screen.getByLabelText("password")
    expect(emailInputNode.value).toMatch("")
    fireEvent.change(emailInputNode,{target: {value: 'johndoe@example.com'}})
    expect(emailInputNode.value).toMatch("johndoe@example.com")
  });

  test("Bio field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const bioInputNode = screen.getByLabelText("bio")
    expect(bioInputNode.value).toMatch("")
    fireEvent.change(bioInputNode,{target: {value: 'john doe bio'}})
    expect(bioInputNode.value).toMatch("john doe bio")
  });

  test("Preferences field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const preferencesInputNode = screen.getByLabelText("preferences")
    expect(preferencesInputNode.value).toMatch("")
    fireEvent.change(preferencesInputNode,{target: {value: 'Movies'}})
    expect(preferencesInputNode.value).toMatch("Movies")
  });

  test("Password field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const passwordInputNode = screen.getByLabelText("password")
    expect(passwordInputNode.value).toMatch("")
    fireEvent.change(passwordInputNode,{target: {value: 'Password123'}})
    expect(passwordInputNode.value).toMatch("Password123")
  });

  test("Password Confirmation field should have label", () => {
    render(<Signup />, {wrapper: MemoryRouter})
    const passwordConfirmationInputNode = screen.getByLabelText("password confirmation")
    expect(passwordConfirmationInputNode.value).toMatch("")
    fireEvent.change(passwordConfirmationInputNode,{target: {value: 'Password123'}})
    expect(passwordConfirmationInputNode.value).toMatch("Password123")
  });
}); 
