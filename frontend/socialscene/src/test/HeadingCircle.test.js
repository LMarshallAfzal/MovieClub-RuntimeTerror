import React from 'react';
import  {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from '../pages/App';
import HeadingCircle from '../components/HeadingCircle';

describe('HeadingCircle', () => {
    test("Heading circle is rendered correctly", () => {
        render(<HeadingCircle/>)
        const headingCircle = screen.getByRole('heading-circle')
        expect(headingCircle).toHaveClass('circle')
    })
})