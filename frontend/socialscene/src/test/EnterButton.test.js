import React from 'react';
import {render, screen} from "@testing-library/react";
import EnterButton from "../components/EnterButton";
import '@testing-library/jest-dom/extend-expect';
import App from "../pages/App"



describe('EnterButton', () => {
    test("Enter button has classname enter-button", () => {
        render(<EnterButton/>);
        const button = screen.getByRole('enter-button')
        expect(button).toHaveClass('enter-button')
        
    })

    test("Enter button has text enter on home page", () => {
        render(<App/>)
        const button = screen.getByRole('enter-button')
        expect(button).toHaveTextContent('enter')
    })

    test("Enter button has text sign up on login page", () => {
        render(<App />)    
        const enterButton = screen.getByRole('enter-button', {hidden: true })
        enterButton.click()
        expect(enterButton).toHaveTextContent('sign up')
    })

    
})
