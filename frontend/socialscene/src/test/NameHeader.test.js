import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NameHeader from "../components/NameHeader";
import { MemoryRouter } from 'react-router-dom'


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('NameHeader', () => {
    it('should render the NameHeader', () => {
        render(
                <MemoryRouter>
                    <NameHeader />
                </MemoryRouter>
        )
    });;


});
