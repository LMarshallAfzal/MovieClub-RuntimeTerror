import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom'
import Homepage from "../pages/core/Homepage";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('Homepage', () => {


    it('should render the Homepage', () => {
        render(
                <MemoryRouter>
                    <Homepage />
                </MemoryRouter>
        )
    });
});
