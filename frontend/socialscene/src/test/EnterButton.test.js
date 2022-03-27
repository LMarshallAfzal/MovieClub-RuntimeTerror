/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, screen} from "@testing-library/react";
import EnterButton from "../components/EnterButton";
import '@testing-library/jest-dom/extend-expect';
import App from "../pages/helper/App"
import Navbar from '../components/root/Navbar';
import AuthContext from "../components/helper/AuthContext";
import { MemoryRouter } from 'react-router';

function renderHomePage(authTokens) {
    return render(
    <AuthContext.Provider value={{authTokens}}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider> 
    )
}  


describe('EnterButton', () => {
    let authTokens;
    beforeEach(() => {
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
    })

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

    // test("Enter button has text logout on everywhere else", () => {
    //     const {getByTestId} = renderHomePage(authTokens);  
    //     const button = getByTestId('enter-button')
    //     button.click()
    //     button.click()
    //     expect(getByTestId('enter-button')).toHaveTextContent('logout')
    //     expect(getByTestId('enter-button')).toHaveClass('enter-button')
    // })

    
})
