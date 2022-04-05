/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Clubs from "../pages/home/Clubs";
import {MemoryRouter} from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";
import { act } from 'react-dom/test-utils';

function renderClubsPage(authTokens) {
    return render(
        <AuthContext.Provider value={{authTokens}}>
            <MemoryRouter>
                <Clubs />
            </MemoryRouter>
        </AuthContext.Provider>
    )
}

describe("Clubs", () => {
    let authTokens;
    beforeEach(() => {
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
    })

    it.skip("should render the clubs page", () => {
        renderClubsPage(authTokens)
        expect(screen.getByText("clubs")).toBeInTheDocument()
    })

    it.skip("should render the clubs page with the correct text", () => {
        renderClubsPage(authTokens)
        expect(screen.getByText("clubs")).toBeInTheDocument()
        expect(screen.getByText("your clubs")).toBeInTheDocument()
        expect(screen.getByText("recommended")).toBeInTheDocument()
    })

    it.skip("should render the clubs page with search bar", () => {
        renderClubsPage(authTokens)
        const searchBar = screen.getByTestId("search-bar")
        expect(searchBar).toBeInTheDocument()
        const contentInput = screen.getByTestId("content-input");
        fireEvent.change(contentInput,{target: {value: "test"}})
        expect(contentInput).toHaveValue("test")

    })

    it.skip("should render the clubs page with create button", () => {
        renderClubsPage(authTokens)
        const createClub = screen.getByText("create")
        expect(createClub).toBeInTheDocument()
        createClub.click()
        expect(global.window.location.pathname).toEqual("/")

    })
})
