import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "../components/core/Sidebar";
import {screen} from '@testing-library/dom'

describe("sidebar", () => {
    test("Username field should have label", () => {
      const view = render(<Sidebar/>);
      const usernameInputNode = view.getByLabelText("username")
      expect(usernameInputNode.value).toMatch("")
      fireEvent.change(usernameInputNode,{target: {value: "johndoe"}})
      expect(usernameInputNode.value).toMatch("johndoe")
    });
    test("Home button should have label", () => {
      const view = render(<Sidebar/>);
      const homeButtonNode = view.getByText("home")
      expect(homeButtonNode).toBeInTheDocument()
    })

  }); 