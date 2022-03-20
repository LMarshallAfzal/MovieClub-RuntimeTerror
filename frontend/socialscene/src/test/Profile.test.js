import React from 'react';
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "../pages/home/Profile";
import {MemoryRouter} from 'react-router-dom'

describe("login", () => {
    test("First name field should have label", () => {
        render(<Profile />, {wrapper: MemoryRouter})
        const usernameInputNode = screen.getByLabelText("first Name")
        expect(usernameInputNode.value).toMatch("")
        fireEvent.change(usernameInputNode,{target: {value: "John"}})
        expect(usernameInputNode.value).toMatch("John")
      });
}); 