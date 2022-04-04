/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { getByTestId,render, screen } from "@testing-library/react";
import RoundButton from "../components/core/RoundButton";
import '@testing-library/jest-dom/extend-expect';
import App from "../pages/core/App"
import Homepage from "../pages/core/Homepage";
import Navbar from '../components/core/Navbar';
import AuthContext from "../components/helper/AuthContext";
import { MemoryRouter } from 'react-router';

function renderNavbar(authTokens) {
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

    it("Round button has text enter on home page", () => {
        renderNavbar(authTokens)
        const roundButton = screen.getByText(/enter/i)
        expect(roundButton).toBeTruthy()
        expect(roundButton).toHaveTextContent('enter')
        expect(roundButton).toHaveClass('enter-button')
    })

    test("Round button has text sign up on login page", () => {
        renderNavbar(authTokens)
        const roundButton = screen.getByText(/enter/i)
        roundButton.click()
        const signUpButton = screen.getByText(/sign up/i)
        expect(signUpButton).toBeTruthy()
        expect(signUpButton).toHaveTextContent('sign up')
        expect(signUpButton).toHaveClass('enter-button')
    })

    // test("Round button has text logout in every other page", () => {
    //     renderNavbar(authTokens)
    //     const roundButton = screen.getByText(/enter/i)
    //     roundButton.click()
    //     expect(roundButton).toHaveTextContent('sign up')
    //     roundButton.click()
    //     renderNavbar(authTokens)
    //     const roundButton2 = screen.getByText(/enter/i)
    //     expect(roundButton2).toHaveTextContent('log out')
    //     expect(roundButton).toHaveClass('enter-button')
    // })

})
