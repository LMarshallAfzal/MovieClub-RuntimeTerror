import React from 'react';
import {render, screen} from "@testing-library/react";
import EnterButton from "../components/EnterButton";
import '@testing-library/jest-dom/extend-expect';
import App from "../pages/helper/App"



describe('EnterButton', () => {
    test("Enter button has text enter on home page", () => {
        render(<App/>)
        const button = screen.getByText(/enter/i)
        expect(button).toHaveTextContent('enter')
        expect(button).toHaveClass('enter-button')
    })

    test("Enter button has text sign up on login page", () => {
        render(<App />)    
        const enterButton = screen.getByText(/enter/i)
        enterButton.click()
        expect(enterButton).toHaveTextContent('sign up')
        expect(enterButton).toHaveClass('enter-button')

    })

    
})
