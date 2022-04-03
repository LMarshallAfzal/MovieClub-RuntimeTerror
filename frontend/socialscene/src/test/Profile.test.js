import React from 'react';
import { render, fireEvent, screen, waitForNextUpdate } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Profile from "../pages/home/Profile";
import { MemoryRouter } from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";


const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Profile", () => {
    const responseOK = (status = 200, body = {}) =>
        Promise.resolve({
            ok: true,
            status,
            json: () => Promise.resolve(body),
        });

    const responseError = (status = 400, body = {}) =>
        Promise.resolve({
            ok: false,
            status,
            json: () => Promise.resolve(body),
        });
    let authTokens;
    let setUserData;
    beforeEach(() => {
        setUserData = jest.fn();
        jest.spyOn(window, 'fetch');
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
        render(
            <AuthContext.Provider value={{ authTokens,setUserData: jest.fn()}}>
                <MemoryRouter>
                    <Profile />
                </MemoryRouter>
            </AuthContext.Provider>

        )
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();

    });
    it("should render the profile page", () => {
        expect(screen.getByTestId("username-input")).toBeTruthy()
        expect(screen.getByTestId("email-input")).toBeTruthy()
        expect(screen.getByTestId("first-name-input")).toBeTruthy()
        expect(screen.getByTestId("last-name-input")).toBeTruthy()
        expect(screen.getByTestId("bio-input")).toBeTruthy()
        expect(screen.getByTestId("preferences-input")).toBeTruthy()
    })

    it("should update the profile", async () => {
        const username = "username";
        const email = "email";
        const firstName = "firstName";
        const lastName = "lastName";
        const bio = "bio";
        const preferences = "preferences";
        const response = responseOK(200, {
            username,
            email,
            firstName,
            lastName,
            bio,
            preferences
        });
        window.fetch.mockImplementation(() => Promise.resolve(response));
        const usernameInput = screen.getByTestId("username-input");
        const emailInput = screen.getByTestId("email-input");
        const firstNameInput = screen.getByTestId("first-name-input");
        const lastNameInput = screen.getByTestId("last-name-input");
        const bioInput = screen.getByTestId("bio-input");
        const preferencesInput = screen.getByTestId("preferences-input");
        const updateButton = screen.getByText("save");
        userEvent.type(usernameInput, username);
        userEvent.type(emailInput, email);
        userEvent.type(firstNameInput, firstName);
        userEvent.type(lastNameInput, lastName);
        userEvent.type(bioInput, bio);
        userEvent.type(preferencesInput, preferences);
        fireEvent.click(updateButton);
        await Promise.resolve().then();
        await waitForNextUpdate;
        expect(window.fetch).toHaveBeenCalledTimes(1);
        });

        it("should update the profile with an error", async () => {
            window.fetch.mockReturnValue(responseError(469, {
                username : "Error text...",
                email : "Error text...",
                first_name : "Error text...",
                last_name : "Error text...",
                bio : "Error text...",
                preferences : "Error text..."

            }));
            const updateButton = screen.getByText("save");
            userEvent.click(updateButton)
            await Promise.resolve().then();
            await waitForNextUpdate;
            expect(window.fetch).toHaveBeenCalledTimes(1);
            
        
});
});






