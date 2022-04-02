import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { screen } from '@testing-library/dom'
import { MemoryRouter } from 'react-router-dom'
import NotFound from "../pages/core/NotFound";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('NotFound', () => {


    it('should render the NotFound', () => {
        render(
                <MemoryRouter>
                    <NotFound />
                </MemoryRouter>
        )
    });
});
