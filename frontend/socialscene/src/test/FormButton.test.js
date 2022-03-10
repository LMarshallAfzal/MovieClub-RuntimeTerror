import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import FormButton from '../components/FormButton';
import Login from "../pages/Login";
import App from "../pages/App";
import Dashboard from "../pages/Dashboard";

describe('FormButton', () => {
    test("Form button has classname form-button", () => {
        render(<FormButton/>);
        const button = screen.getByRole('form-button')
        expect(button).toHaveClass('form-button')
        
    })

    test("Form buttons have correct text content on login page", () => {
        render(<Login/>)
        const loginButton = screen.getByText('Log in')
        const forgotPasswordButton = screen.getByText('forgot password')
        expect(loginButton).toHaveTextContent('Log in')
        expect(forgotPasswordButton).toHaveTextContent('forgot password')
    })

    test("Form button has correct text content on signup page", () => {
        render(<App/>)
        const button = screen.getByRole('enter-button')
        button.click()
        button.click()  
        const signupButton = screen.getByRole('form-button')
        expect(signupButton).toHaveTextContent('sign up')
    })

    test("Form button has correct text content on dashboard page", () => {
        render(<Dashboard/>)    
        const dashboardButton = screen.getByRole('form-button')
        expect(dashboardButton).toHaveTextContent('Create')
    })

    
})
