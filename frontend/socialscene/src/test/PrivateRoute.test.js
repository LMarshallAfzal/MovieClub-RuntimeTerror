// import React from 'react';
// import { render } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import PrivateRoute from "../components/helper/PrivateRoute";
// import { screen } from '@testing-library/dom'
// import { MemoryRouter } from 'react-router-dom'
// import AuthContext from "../components/helper/AuthContext";


// const mockNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useNavigate: () => mockNavigate,
// }));

// describe('PrivateRoute', () => {


//     it('should render the PrivateRoute', () => {
//         let authTokens;
//         authTokens = {
//             accessToken: 'accessToken',
//             refreshToken: 'refreshToken'
//         }
//         render(
//             <AuthContext.Provider value={{ authTokens }}>
//                 <MemoryRouter>
//                     <PrivateRoute />
//                 </MemoryRouter>
//             </AuthContext.Provider>
//         )
//     });
// });
