import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieQuote from "../components/MovieQuote";
import { screen } from '@testing-library/dom'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('MovieQuote', () => {


    it('should render the MovieQuote', () => {
        render(
                <MemoryRouter>
                    <MovieQuote />
                </MemoryRouter>
        )
    });
});
