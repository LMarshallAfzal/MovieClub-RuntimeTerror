/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Movies from "../pages/home/Movies";
import {MemoryRouter} from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";
import { act } from 'react-dom/test-utils';

function renderMoviesPage(authTokens) {
    return render(
      <AuthContext.Provider value={{authTokens}}>
        <MemoryRouter>
            <Movies/>
        </MemoryRouter>
    </AuthContext.Provider>
        
    )
}

describe("Movies", () => {
    let authTokens;
    beforeEach(() => {
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
    })

    it("should render the movies page with correct text", () => {
        renderMoviesPage(authTokens)
        expect(screen.getByText("movies")).toBeInTheDocument()
        expect(screen.getByText("club movies")).toBeInTheDocument()
        expect(screen.getByText("recommended")).toBeInTheDocument()
        expect(screen.getByText("watched")).toBeInTheDocument()
    })

    it("should render the movies page with search bar", () => {
        renderMoviesPage(authTokens)
        const searchBar = screen.getByTestId("search-bar")
        expect(searchBar).toBeInTheDocument()
        const contentInput = screen.getByTestId("content-input");
        fireEvent.change(contentInput,{target: {value: "test"}})
        expect(contentInput).toHaveValue("test")

    })

    it("should render cards with all club movies", () => {
        renderMoviesPage(authTokens)
        const cards = screen.getAllByTestId("club-card")
        const watchedButton = screen.getAllByText("watch")
        // expect(cards.length).toEqual(5)
        // expect(cards).toContainElement(screen.getByText("watch"))
        expect(cards[0]).toHaveTextContent("The Avengers")
    })

    it("should render cards with all recommened movies", () => {
        renderMoviesPage(authTokens)
        const cards = screen.getAllByTestId("rec-card")
        // expect(cards.length).toEqual(5)
        expect(cards[0]).toHaveTextContent("The Avengers")
    })

    it("should render cards with all watched movies", () => {
        renderMoviesPage(authTokens)
        const cards = screen.getAllByTestId("watched-card")
        // expect(cards.length).toEqual(5)
        expect(cards[0]).toHaveTextContent("The Avengers")
    })
})
