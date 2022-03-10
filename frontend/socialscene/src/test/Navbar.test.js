import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Navbar from "../components/Navbar";
import App from "../pages/App";

describe('Navbar', () => {
    test("Navbar is rendered correctly", () => {
        render(<App/>);
        const navbar = screen.getByRole('navbar')
        expect(navbar).toHaveClass('navbar')
    })
})