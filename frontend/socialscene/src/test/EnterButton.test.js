import React from 'react';
import {render, screen} from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import EnterButton from "../components/EnterButton";
import '@testing-library/jest-dom/extend-expect';
import App from "../pages/App"
import Home from "../pages/Home"
import Navbar from "../components/Navbar"

describe('EnterButton', () => {
    test("Enter button has classname enter-button", () => {
        render(<EnterButton/>);
        const button = screen.getByRole('enter-button')
        expect(button).toHaveClass('enter-button')
        
    })

    test("Enter button has text enter", () => {
        render(<App/>)
        const button = screen.getByRole('enter-button')
        expect(button).toHaveTextContent('enter')
    })

    // test("Enter button has text sign up", () => {
    //     render(<App />, '/home')    
    //     const button = screen.getByRole('enter-button', {hidden: true })
    //     expect(button).toHaveTextContent('sign up')
    // })

    // test("Enter button geg has text sign up", () => {
    //     render(<App/>)
    //     const button = screen.getByRole('enter-button')
    //     expect(button).toHaveTextContent('enter')
    // })
})
