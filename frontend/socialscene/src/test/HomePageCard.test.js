import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomepageCard from "../components/helper/HomepageCard";
import { screen } from '@testing-library/dom'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('HomepageCard', () => {


    it('should render the HomepageCard', () => {
        let authTokens;
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
        render(
            <AuthContext.Provider value={{ authTokens }}>
                <MemoryRouter>

                    <HomepageCard />
                </MemoryRouter>
            </AuthContext.Provider>
        )
    });
});
