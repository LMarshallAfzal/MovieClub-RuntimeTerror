import React from 'react';
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import HeadingCircle from "../components/HeadingCircle";
import {screen} from '@testing-library/dom'
import {MemoryRouter} from 'react-router-dom'

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('HeadingCircle', () => {
  beforeEach(() => {
    render(
            <MemoryRouter>

    <HeadingCircle />
    </MemoryRouter>

  )
      
  });
  
  it('should render the heading circle', () => {
    const headingCircle = screen.getByRole(/heading-circle/i)
    expect (headingCircle).toBeTruthy()
  });
})  