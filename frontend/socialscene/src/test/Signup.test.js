import React, {useContext} from 'react';
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import Signup from "../pages/root/Signup";
import AuthContext from "../components/helper/AuthContext";
import {MemoryRouter} from 'react-router-dom'
import user from '@testing-library/user-event';
// import { check } from 'prettier';



function RenderAuthContext(context, onChange, onClick) {
  
  render(
    <AuthContext.Provider value={context}>
      <Signup onChange={onChange} onClick={onClick}/>
    </AuthContext.Provider>
  )
}  

describe("Signup", () => {
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
    const headingTextNode = screen.getByRole('heading', { name: /sign up./i })
    expect(headingTextNode).toBeInTheDocument()
    expect(headingTextNode.textContent).toEqual('sign up.')
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

  test("Last name textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const lastNameInputNode = screen.getByRole('textbox', {name: /last name/i})
    expect(lastNameInputNode).toBeInTheDocument()    
  })

  test("Email textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const emailInputNode = screen.getByRole('textbox', {name: /email/i})
    expect(emailInputNode).toBeInTheDocument()    
  })

  test("Bio textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const bioInputNode = screen.getByRole('textbox', {name: /bio/i})
    expect(bioInputNode).toBeInTheDocument()    
  })

  test("Preferences textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const preferencesInputNode = screen.getByRole('textbox', {name: /preferences/i})
    expect(preferencesInputNode).toBeInTheDocument()    
  })

  test("Password textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const passwordInputNode = screen.getByRole('textbox', {name: /password/i})
    expect(passwordInputNode).toBeInTheDocument()    
  })

  test("Password confirmation textfield is rendered correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const passwordConfirmationInputNode = screen.getByRole('textbox', {name: /password confirmation/i})
    expect(passwordConfirmationInputNode).toBeInTheDocument()    
  })

  test("Username textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const usernameInputNode = screen.getByRole('textbox', {name: /username/i})
    expect(usernameInputNode.value).toMatch("")
    fireEvent.change(usernameInputNode, {target: {value: "johndoe01"}})
    expect(usernameInputNode.value).toMatch("johndoe01")
  });

  test("First name textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const firstNameInputNode = screen.getByRole('textbox', {name: /first name/i})
    expect(firstNameInputNode.value).toMatch("")
    fireEvent.change(firstNameInputNode, {target: {value: "John"}})
    expect(firstNameInputNode.value).toMatch("John")
  });

  test("Last name textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const lastNameInputNode = screen.getByRole('textbox', {name: /last name/i})
    expect(lastNameInputNode.value).toMatch("")
    fireEvent.change(lastNameInputNode, {target: {value: "Doe"}})
    expect(lastNameInputNode.value).toMatch("Doe")
  });

  test("Email textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const emailInputNode = screen.getByRole('textbox', {name: /email/i})
    expect(emailInputNode.value).toMatch("")
    fireEvent.change(emailInputNode, {target: {value: "johndoe@example.org"}})
    expect(emailInputNode.value).toMatch("johndoe@example.org")
  });

  test("Bio textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const bioInputNode = screen.getByRole('textbox', {name: /bio/i})
    expect(bioInputNode.value).toMatch("")
    fireEvent.change(bioInputNode, {target: {value: "My name is John Doe, this is my bio"}})
    expect(bioInputNode.value).toMatch("My name is John Doe, this is my bio")
  });

  test("Preferences textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const preferencesInputNode = screen.getByRole('textbox', {name: /preferences/i})
    expect(preferencesInputNode.value).toMatch("")
    fireEvent.change(preferencesInputNode, {target: {value: "action, horror, sci-fi"}})
    expect(preferencesInputNode.value).toMatch("action, horror, sci-fi")
  });

  test("Password textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const passwordInputNode = screen.getByRole('textbox', {name: /password/i})
    expect(passwordInputNode.value).toMatch("")
    fireEvent.change(passwordInputNode, {target: {value: "Password123!"}})
    expect(passwordInputNode.value).toMatch("Password123!")
  });

  test("Password confirmation textfield should accept input correctly", () => {
    RenderAuthContext(context, onChange, onClick)
    const passwordConfirmationInputNode = screen.getByRole('textbox', {name: /password confirmation/i})
    expect(passwordConfirmationInputNode.value).toMatch("")
    fireEvent.change(passwordConfirmationInputNode, {target: {value: "Password123!"}})
    expect(passwordConfirmationInputNode.value).toMatch("Password123!")
  })

  // test("There are 7 required fields", async () => {
  //   const button = screen.getByRole('button', { name: /sign up/i });
  //   button.click()
    
  //   await waitFor(() => {
  //     expect(screen.getByText("This field may not be blank")).toBeInTheDocument()
  //   })
  // })

  // test("onClick is called when all fields pass validation", async () => {
  //   RenderAuthContext(context, onChange, onClick)
  //   user.type(screen.getByRole('textbox', {name: /username/i}, 'John'))
  //   user.type(screen.getByRole('textbox', {name: /first name/i}, 'John'))
  //   user.type(screen.getByRole('textbox', {name: /last name/i}, 'John'))
  //   user.type(screen.getByRole('textbox', {name: /email/i}, 'John'))
  //   user.type(screen.getByRole('textbox', {name: /bio/i}, 'John'))
  //   user.type(screen.getByRole('textbox', {name: /preferences/i}, 'John'))
  //   user.type(screen.getByRole('textbox', {name: /password/i}, 'John'))
  //   user.type(screen.getByRole('textbox', {name: /password confirmation/i}, 'John'))
  //   user.click(screen.getByRole('button', { name: /sign up/i }));

  //   await waitFor(() => {
  //     expect(onClick).toHaveBeenCalledTimes(1);
  //   });

  //   expect(onClick).toHaveBeenCalledWith({
  //     username: 'johndoe15',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'johndoe@example.org',
  //     bio: 'I am John Doe',
  //     preferences: 'Action',
  //     password: 'Password123!',
  //     passwordConfirmation: 'Password123!'
  //   });
  // })
  
}); 
