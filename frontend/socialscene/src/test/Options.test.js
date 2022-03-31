/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import Options from "../pages/home/Options";
import {MemoryRouter} from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";
import { act } from 'react-dom/test-utils';

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

function mockFetchOnChangePasswordPostRequest(user) {
    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(user)
        })
    })
}

describe("Options", () => {
    let authTokens;
    beforeEach(() => {
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
    })

    it("should render the options page", () => {
        renderOptionsPage(authTokens)
        expect(screen.getByText("options")).toBeInTheDocument()
    })

    it("should render the options page with the correct text", () => {
        renderOptionsPage(authTokens)
        expect(screen.getByText("options")).toBeInTheDocument()
        expect(screen.getByText("change password:")).toBeInTheDocument()
        expect(screen.getByText("notifications")).toBeInTheDocument()
    })

    it("should render the options page with correct text fields", () => {
        renderOptionsPage(authTokens)
        const oldPasswordField = screen.getByTestId("old-password")
        const newPasswordField = screen.getByTestId("new-password")
        const confirmPasswordField = screen.getByTestId("confirm-new-password")
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

    // it("should display correct error message for incorrect password", () => {
    //     renderOptionsPage(authTokens)
    //     const submitButton = screen.getByText("submit")
    //     const oldPasswordField = screen.getByTestId("old-password")
    //     const newPasswordField = screen.getByTestId("new-password")
    //     const confirmPasswordField = screen.getByTestId("confirm-new-password")
    //     fireEvent.change(newPasswordField, {target: {value: "Password1234"}})
    //     fireEvent.change(oldPasswordField, {target: {value: "wrongOldPassword123"}})
    //     fireEvent.change(confirmPasswordField, {target: {value: "Password1234"}})
    //     mockFetchGetUserPasswordData()
    //     submitButton.click()
    //     waitFor(() => {
    //         expect(screen.getByText("Incorrect password.")).toBeInTheDocument()
    //     })
    // })

    
})