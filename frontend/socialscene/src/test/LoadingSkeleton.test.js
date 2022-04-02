// import React from 'react';
// import { render } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import LoadingSkeleton from "../components/helper/LoadingSkeleton";
// import { screen } from '@testing-library/dom'
// import { MemoryRouter } from 'react-router-dom'
// import AuthContext from "../components/helper/AuthContext";


// const mockNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useNavigate: () => mockNavigate,
// }));

// describe('LoadingSkeleton', () => {


//     it('should render the LoadingSkeleton', () => {
//         let setMovie;
//         setMovie = jest.fn();
//         render(
//             <AuthContext.Provider value={{ setMovie }}>
//                 <MemoryRouter>
//                     <LoadingSkeleton />
//                 </MemoryRouter>
//             </AuthContext.Provider>
//         )
//     });
// });
