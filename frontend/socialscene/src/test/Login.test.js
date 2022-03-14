import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/Login";
import {screen} from '@testing-library/dom'



describe("login", () => {
  test("Username field should have label", () => {
    render(<Login/>);
    const usernameInputNode = screen.getByLabelText("username")
    expect(usernameInputNode.value).toMatch("")
    fireEvent.change(usernameInputNode,{target: {value: "johndoe"}})
    expect(usernameInputNode.value).toMatch("johndoe")
  });

  test("Password field field should have label", () => {
    render(<Login/>);
    const passwordInputNode = screen.getByLabelText("password")
    expect(passwordInputNode.value).toMatch("")
    fireEvent.change(passwordInputNode,{target: {value: 'Password123'}})
    expect(passwordInputNode.value).toMatch("Password123")
  });

  test("Should render a log in button with class formButton", () =>  {
    render(<Login/>);
    const logInButtonNode = screen.getByText('Log in')
    expect(logInButtonNode).toHaveClass('form-button')
  });

  test("Should render a forgot password button with class formButton", () =>  {
    render(<Login/>);
    const forgotPasswordButtonNode = screen.getByText('forgot password')
    expect(forgotPasswordButtonNode).toHaveClass('form-button')
  });
}); 
