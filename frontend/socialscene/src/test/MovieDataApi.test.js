import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDataAPI from "../components/helper/MovieDataAPI";
import { screen } from '@testing-library/dom'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('MovieDataAPI', () => {


    it('should render the MovieDataAPI', () => {
        render(
                <MemoryRouter>
                    <MovieDataAPI />
                </MemoryRouter>
        )
    });
});
