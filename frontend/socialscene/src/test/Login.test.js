import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/root/Login";
import AuthContext from "../components/helper/AuthContext";
import {screen} from '@testing-library/dom'

function RenderAuthContext(context, onChange, onClick) {
  
  render(
    <AuthContext.Provider value={context}>
      <Login onChange={onChange} onClick={onClick}/>
    </AuthContext.Provider>
  )
}  

describe("login", () => {
  const onChange = jest.fn();
  const onClick = jest.fn();
  const context = {
    loginUser: {
      username: 'johndoe',
      password: 'Password123!'
    },
    setLoginCredentials: jest.fn()
  };

  test("Sign up heading text is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const headingTextNode = screen.getByRole('heading', { name: /log up./i })
    expect(headingTextNode).toBeInTheDocument()
    expect(headingTextNode.textContent).toEqual('log up.')
  });

  test("Username textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const usernameInputNode = screen.getByRole('textbox', {name: /username/i})
    expect(usernameInputNode).toBeInTheDocument()    
  })

  test("First name textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const firstNameInputNode = screen.getByRole('textbox', {name: /first name/i})
    expect(firstNameInputNode).toBeInTheDocument()    
  })

  test("Log in button is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const logInButtonNode = screen.getByRole('button', {name: /log in/i})
    expect(logInButtonNode).toBeInTheDocument()
  })

  test("Username field should have label", () => {
    RenderAuthContext(context, onChange, onClick)
    const usernameInputNode = screen.getByRole('textbox', {name: /username/i})
    expect(usernameInputNode.value).toMatch("")
    fireEvent.change(usernameInputNode,{target: {value: "johndoe"}})
    expect(usernameInputNode.value).toMatch("johndoe")
  });

  test("Password field field should have label", () => {
    RenderAuthContext(context, onChange, onClick)
    const passwordInputNode = screen.getByRole('textbox', {name: /password/i})
    expect(passwordInputNode.value).toMatch("")
    fireEvent.change(passwordInputNode,{target: {value: 'Password123'}})
    expect(passwordInputNode.value).toMatch("Password123")
  });

  test("Should render a log in button with class formButton", () =>  {
    RenderAuthContext(context, onChange, onClick)
    const logInButtonNode = screen.getByText('Log in')
    expect(logInButtonNode).toHaveClass('form-button')
  });

  test("Should render a forgot password button with class formButton", () =>  {
    RenderAuthContext(context, onChange, onClick)
    const forgotPasswordButtonNode = screen.getByText('forgot password')
    expect(forgotPasswordButtonNode).toHaveClass('form-button')
  });
}); 
