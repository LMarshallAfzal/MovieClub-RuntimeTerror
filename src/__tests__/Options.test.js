import React from 'react';
import { render, fireEvent, screen, waitForNextUpdate } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Options from "../pages/home/Options";
import { MemoryRouter } from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";



const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Options", () => {
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
    let changePassword;
    let authTokens;
    beforeEach(() => {
        jest.spyOn(window, 'fetch');
        changePassword = jest.fn();
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
        render(
            <AuthContext.Provider value={{ authTokens, setPasswordData: jest.fn() }}>
                <MemoryRouter>
                    <Options />
                </MemoryRouter>
            </AuthContext.Provider>

        )
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();

    });
    it.skip("should render the options page", () => {
        expect(screen.getByTestId("old-password")).toBeTruthy()
        expect(screen.queryByPlaceholderText("your current password")).toBeTruthy()
        expect(screen.getByTestId("new-password")).toBeTruthy()
        expect(screen.queryByPlaceholderText("choose a new password")).toBeTruthy()
        expect(screen.getByTestId("new-password-confirmation")).toBeTruthy()
        expect(screen.queryByPlaceholderText("re-enter your new password")).toBeTruthy()
        expect(screen.getByText("submit")).toBeTruthy()

    })

    it("should render the options page with the correct text", () => {
        expect(screen.getByText("change password:")).toBeTruthy()
        expect(screen.getByText("notifications")).toBeTruthy()
    })

    it.skip("should render the options page with correct text fields", () => {
        const oldPasswordField = screen.getByTestId("old-password")
        const newPasswordField = screen.getByTestId("new-password")
        const confirmPasswordField = screen.getByTestId("new-password-confirmation")
        expect(oldPasswordField).toBeInTheDocument()
        expect(newPasswordField).toBeInTheDocument()
        expect(confirmPasswordField).toBeInTheDocument()
    })

    it("should render the options page with correct buttons", () => {
        const submitButton = screen.getByText("submit")
        expect(submitButton).toBeInTheDocument()
    })

    it("should display correct error message for blank text fields", async () => {
        window.fetch.mockReturnValue(
            responseError(469, {
                old_password: "Error text...",
                new_password: "Error text...",
                new_password_confirmation: "Error text...",
            })
        );

        const submitButton = screen.getByText("submit");
        await userEvent.click(submitButton);
        await Promise.resolve().then();
        await waitForNextUpdate;

    })

    it.skip("should change password with no errors when given valid input", async () => {
        const submitButton = screen.getByText("submit")
        const oldPasswordField = screen.getByTestId("old-password").querySelector('input')
        const newPasswordField = screen.getByTestId("new-password").querySelector('input')
        const confirmPasswordField = screen.getByTestId("new-password-confirmation").querySelector('input')
        fireEvent.change(newPasswordField, { target: { value: "Password1234" } });
        fireEvent.change(oldPasswordField, { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordField, { target: { value: "Password1234" } });
        window.fetch.mockReturnValue(responseOK(200, {}));
        await userEvent.click(submitButton);
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(
            "http://127.0.0.1:8000/change_password/",
            expect.any(Object)
        );
        expect(JSON.parse(window.fetch.mock.calls[0][1].body)).toMatchObject({
            ["old_password"]: "Password123",
            ["new_password"]: "Password1234",
            ["new_password_confirmation"]: "Password1234",
        });
        await Promise.resolve().then();
        await waitForNextUpdate;
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    it.skip("should display error message for invalid input", async () => {
        const submitButton = screen.getByText("submit")
        const oldPasswordField = screen.getByTestId("old-password").querySelector('input')
        const newPasswordField = screen.getByTestId("new-password").querySelector('input')
        const confirmPasswordField = screen.getByTestId("new-password-confirmation").querySelector('input')
        fireEvent.change(newPasswordField, { target: { value: "Password1234" } });
        fireEvent.change(oldPasswordField, { target: { value: "Password123" } });
        fireEvent.change(confirmPasswordField, { target: { value: "Password1234" } });
        window.fetch.mockReturnValue(responseError(400, {
            old_password: "Error text...",
            new_password: "Error text...",
            new_password_confirmation: "Error text...",
        }));
        await userEvent.click(submitButton);
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(
            "http://127.0.0.1:8000/change_password/",
            expect.any(Object))
    })
    it("should form be inputted but password not set", () => {
        window.fetch.mockReturnValue(responseError());

        const submitButton = screen.getByText("submit")

        userEvent.click(submitButton);

        expect(changePassword).not.toHaveBeenCalled();
    });
});




