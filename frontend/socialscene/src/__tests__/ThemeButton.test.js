// /* eslint-disable testing-library/prefer-screen-queries */
// import React from 'react';
// import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom/extend-expect';
// import utils from '../utils';
// import App from "../pages/core/App"
// import Homepage from "../pages/core/Homepage";
// import ThemeButton from '../components/core/ThemeButton';
// import AuthContext from "../components/helper/AuthContext";
// import ClubCreate from "../components/ClubCreate";
// import ClubDetail from "../components/ClubDetail";
// import axios from 'axios';
// import {AppContext} from './context';



// import { MemoryRouter } from 'react-router';

// jest.mock('axios');


// function renderClubCreate(authTokens) {
//     return render(
//         <AuthContext.Provider value={{ authTokens }}>
//             <MemoryRouter>
//                 <ClubCreate />
//             </MemoryRouter>
//         </AuthContext.Provider>
//     )
// }
// function renderClubDetail(authTokens) {
//     return render(
//         <AuthContext.Provider value={{ authTokens }}>
//             <MemoryRouter>
//                 <ClubDetail />
//             </MemoryRouter>
//         </AuthContext.Provider>
//     )
// }


// describe('ThemeButton', () => {
//     let authTokens;
//     beforeEach(() => {
//         authTokens = {
//             accessToken: 'accessToken',
//             refreshToken: 'refreshToken',
//         }
//     })


//     test("Theme button has text create on club page", () => {
//         renderClubCreate(authTokens)
//         const button = screen.getByText(/create/i)
//         expect(button).toHaveTextContent('create')
//         expect(button).toHaveClass('form-button')
//     })

//     test("Theme button has text edit on club detail page", () => {
//         renderClubDetail(authTokens)
//         const button = screen.getByText(/edit/i)
//         expect(button).toHaveTextContent('edit')
//         expect(button).toHaveClass('form-button')
//     })

//     // test("Theme button has text delete on club detail page", () => {
//     //     renderClubDetail(authTokens)
//     //     const button = screen.getByText(/delete/i)
//     //     expect(button).toHaveTextContent('delete')
//     //     expect(button).toHaveClass('form-button')
//     // }
//     // )



// })
