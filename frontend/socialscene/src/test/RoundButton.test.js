/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, screen } from "@testing-library/react";
import RoundButton from "../components/core/RoundButton";
import '@testing-library/jest-dom/extend-expect';
import App from "../pages/core/App"
import Homepage from "../pages/core/Homepage";
import Navbar from '../components/core/Navbar';
import AuthContext from "../components/helper/AuthContext";
import { MemoryRouter } from 'react-router';

function renderHomePage(authTokens) {
    return render(
        <AuthContext.Provider value={{ authTokens }}>
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>
    )
}


describe('RoundButton', () => {
    let authTokens;
    beforeEach(() => {
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
    })

    test("Round button has text enter on home page", () => {
        render(<App />)
        const button = screen.getByText(/enter/i)
        expect(button).toHaveTextContent('enter')
        expect(button).toHaveClass('enter-button')
    })

    test("Round button has text sign up on login page", () => {
        render(<App />)
        const roundButton = screen.getByText(/enter/i)
        roundButton.click()
        expect(roundButton).toHaveTextContent('sign up')
        expect(roundButton).toHaveClass('enter-button')
    })

    skip("Round button has text logout in every other page", () => {
        render(<App />)
        const roundButton = screen.getByText(/enter/i)
        roundButton.click()
        expect(roundButton).toHaveTextContent('logout')
        expect(roundButton).toHaveClass('enter-button')
    })

})
