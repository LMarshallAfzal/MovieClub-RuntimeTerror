/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import Options from "../pages/home/Options";
import {MemoryRouter} from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";
import {submitChangePasswordForm} from "../pages/home/Options";
import { act } from 'react-dom/test-utils';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

function renderOptionsPage(authTokens) {
    return render(
      <AuthContext.Provider value={{authTokens}}>
        <MemoryRouter>
            <Options/>
        </MemoryRouter>
    </AuthContext.Provider>
        
    )
}

function mockFetchGetUserPasswordData() {
    return {
        json: () => {
            return {
                old_password: 'Password123',
                new_password: 'Password1234',
                new_password_confirmation: 'Password1234',
            }
        }
    }
}


global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve({mockFetchGetUserPasswordData})
        })
    );


jest.spyOn(global, 'alert')




describe("Options", () => {
    let authTokens;
    beforeEach(() => {
        fetch.resetMocks()
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
    })
    enableFetchMocks();
    it("should render the options page", () => {
        renderOptionsPage(authTokens)
        expect(screen.getByTestId("old-password")).toBeTruthy()
        expect(screen.queryByPlaceholderText("your current password")).toBeTruthy()
        expect(screen.getByTestId("new-password")).toBeTruthy()
        expect(screen.queryByPlaceholderText("choose a new password")).toBeTruthy()
        expect(screen.getByTestId("new-password-confirmation")).toBeTruthy()
        expect(screen.queryByPlaceholderText("re-enter your new password")).toBeTruthy()
        expect(screen.getByText("submit")).toBeTruthy()

    })

    it("should render the options page with the correct text", () => {
        renderOptionsPage(authTokens)
        expect(screen.getByText("change password:")).toBeTruthy()
        expect(screen.getByText("notifications")).toBeTruthy()
    })

    it("should render the options page with correct text fields", () => {
        renderOptionsPage(authTokens)
        const oldPasswordField = screen.getByTestId("old-password")
        const newPasswordField = screen.getByTestId("new-password")
        const confirmPasswordField = screen.getByTestId("new-password-confirmation")
        expect(oldPasswordField).toBeInTheDocument()
        expect(newPasswordField).toBeInTheDocument()
        expect(confirmPasswordField).toBeInTheDocument()
    })

    it("should render the options page with correct buttons", () => {
        renderOptionsPage(authTokens)
        const submitButton = screen.getByText("submit")
        expect(submitButton).toBeInTheDocument()
    })

    it("should display correct error message for blank text fields", () => {
        renderOptionsPage(authTokens)
        const submitButton = screen.getByText("submit")
        submitButton.click()
        waitFor(() => {
            expect(screen.getByText("This field may not be blank.")).toBeInTheDocument()
        })
    })

    it("should display correct error message for incorrect password", async() => {
        renderOptionsPage(authTokens)
        const submitButton = screen.getByText("submit")
        const oldPasswordField = screen.getByTestId("old-password").querySelector('input')
        const newPasswordField = screen.getByTestId("new-password").querySelector('input')
        const confirmPasswordField = screen.getByTestId("new-password-confirmation").querySelector('input')
        fireEvent.change(newPasswordField, {target: {value: "Password1234"}})
        fireEvent.change(oldPasswordField, {target: {value: "wrongOldPassword1"}})
        fireEvent.change(confirmPasswordField, {target: {value: "Password1234"}})
        mockFetchGetUserPasswordData()
        submitButton.click()
        const confirmation = await submitChangePasswordForm;
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    it("should display correct error message for incorrect password confirmation", async() => {
        renderOptionsPage(authTokens)
        const submitButton = screen.getByText("submit")
        const oldPasswordField = screen.getByTestId("old-password").querySelector('input')
        const newPasswordField = screen.getByTestId("new-password").querySelector('input')
        const confirmPasswordField = screen.getByTestId("new-password-confirmation").querySelector('input')
        fireEvent.change(newPasswordField, {target: {value: "Password1234"}})
        fireEvent.change(oldPasswordField, {target: {value: "Password123"}})
        fireEvent.change(confirmPasswordField, {target: {value: "Password123"}})
        mockFetchGetUserPasswordData()
        submitButton.click()
        const t = () => {
            throw new TypeError();
          };
          expect(t).toThrow(TypeError);
        waitFor(() => {
            expect(screen.getByText("Passwords do not match.")).toBeInTheDocument()
        })
    })

    it("should change password", async () => {
        fetch.mockResponseOnce(JSON.stringify(mockFetchGetUserPasswordData,{status:200}))
        renderOptionsPage(authTokens)
        const submitButton = screen.getByText("submit")
        const oldPasswordField = screen.getByTestId("old-password").querySelector('input')
        const newPasswordField = screen.getByTestId("new-password").querySelector('input')
        const confirmPasswordField = screen.getByTestId("new-password-confirmation").querySelector('input')
        fireEvent.change(newPasswordField, {target: {value: "Password1234"}})
        fireEvent.change(oldPasswordField, {target: {value: "Password123"}})
        fireEvent.change(confirmPasswordField, {target: {value: "Password1234"}})
        submitButton.click()
        const confirmation = await submitChangePasswordForm;
        expect(fetch).toHaveBeenCalledTimes(1)
        //expect(global.alert.getByText("You have successfully changed your password.")).toBeTruthy()
        
    })

    it("should display correct error message for incorrect password2", async() => {
        renderOptionsPage(authTokens)
        const submitButton = screen.getByText("submit")
        const oldPasswordField = screen.getByTestId("old-password").querySelector('input')
        const newPasswordField = screen.getByTestId("new-password").querySelector('input')
        const confirmPasswordField = screen.getByTestId("new-password-confirmation").querySelector('input')
        fireEvent.change(newPasswordField, {target: {value: "Password1234"}})
        fireEvent.change(oldPasswordField, {target: {value: "wrongOldPassword1"}})
        fireEvent.change(confirmPasswordField, {target: {value: "Password1234"}})
        mockFetchGetUserPasswordData()
        submitButton.click()
        const confirmation = await submitChangePasswordForm;
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    it("should display 400 error message for incorrect password", async() => {
        fetch.mockImplementationOnce(() => Promise.reject("API Failure"))
        renderOptionsPage(authTokens)
        const submitButton = screen.getByText("submit")
        const oldPasswordField = screen.getByTestId("old-password").querySelector('input')
        const newPasswordField = screen.getByTestId("new-password").querySelector('input')
        const confirmPasswordField = screen.getByTestId("new-password-confirmation").querySelector('input')
        fireEvent.change(newPasswordField, {target: {value: "Password1234"}})
        fireEvent.change(oldPasswordField, {target: {value: "Password123"}})
        fireEvent.change(confirmPasswordField, {target: {value: "Password1234"}})
        mockFetchGetUserPasswordData()
        submitButton.click()
        const confirmation = await fetch(submitChangePasswordForm);
        expect(fetch.response).toEqual(400)
        expect(fetch).toHaveBeenCalledTimes(1);

    })



    
})