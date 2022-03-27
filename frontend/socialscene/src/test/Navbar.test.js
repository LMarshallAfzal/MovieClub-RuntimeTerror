import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Navbar from "../components/root/Navbar";
import App from "../pages/helper/App";
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

describe('Navbar', () => {
    test("Navbar is rendered correctly", () => {
        render(<App/>)
        const navbar = screen.getByTestId('navbar')
        expect(navbar).toBeInTheDocument()
        expect(navbar).toHaveClass('navbar')
    })

    test("Navbar has a logo", () => {
        render(<App/>)
        const logo = screen.getByTestId('logo')
        expect(logo).toBeInTheDocument()
        expect(logo).toHaveClass('navbar-logo')
    })
})