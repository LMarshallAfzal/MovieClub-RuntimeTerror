import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../components/root/Sidebar";
import {screen} from '@testing-library/dom'

describe("sidebar", () => {
    test("Username field should have label", () => {
      const view = render(<Sidebar/>);
      const usernameInputNode = view.getByLabelText("username")
      expect(usernameInputNode.value).toMatch("")
      fireEvent.change(usernameInputNode,{target: {value: "johndoe"}})
      expect(usernameInputNode.value).toMatch("johndoe")
    });
  
    // test("Password field field should have label", () => {
    //   const view = render(<Sidebar/>);
    //   const passwordInputNode = view.getByLabelText("password")
    //   expect(passwordInputNode.value).toMatch("")
    //   fireEvent.change(passwordInputNode,{target: {value: 'Password123'}})
    //   expect(passwordInputNode.value).toMatch("Password123")
    // });
  
    // test("Should render a log in button with class formButton", () =>  {
    //   const view = render(<Sidebar/>);
    //   const logInButtonNode = view.getByText('Log in')
    //   expect(logInButtonNode).toHaveClass('form-button')
    // });
  
    // test("Should render a forgot password button with class formButton", () =>  {
    //   const view = render(<Login/>);
    //   const forgotPasswordButtonNode = view.getByText('forgot password')
    //   expect(forgotPasswordButtonNode).toHaveClass('form-button')
    // });
  
    // test("Should render a HeadingCircle with the text 'log in", () => {
    //   const view = render(<Login/>);
    //   const headingCircleNode = view.getByTestId('200')
    //   expect(headingCircleNode).toHaveClass('circle')
    // })
  }); 