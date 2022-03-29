/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render, fireEvent, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "../pages/home/Profile";
import {MemoryRouter} from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";
import { act } from 'react-dom/test-utils';

function renderProfilePage(authTokens, user) {
    return render(
      <AuthContext.Provider value={{authTokens, user}}>
        <MemoryRouter>
            <Profile/>
        </MemoryRouter>
    </AuthContext.Provider>
        
    )
}

function mockFetchOnPrefilledTestFields (user) {
    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(user)
        })
    })
}

function mockFetchGetUserData() {
    return {
        json: () => {
            return {
                username: 'test',
                firstName: 'test',
                lastName: 'test',
                email: 'test@test.test',
                bio: 'test',
                preferences: 'test', 
            }
        }
    }
}



describe("Profile", () => {
  let authTokens;
  let user;
  let getUserData;
  beforeEach(() => {
    authTokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    }
    user = jest.fn();
    getUserData = mockFetchGetUserData();
  })

  it("should render the profile page", () => {
    const {getByText} = renderProfilePage(authTokens, user);
    expect(getByText('profile')).toBeInTheDocument();
  })  
  
  it("should render the profile form", () => {
    const {getByTestId} = renderProfilePage(authTokens, user);
    expect(getByTestId('username-field')).toBeInTheDocument();
    expect(getByTestId('first-name-field')).toBeInTheDocument();
    expect(getByTestId('last-name-field')).toBeInTheDocument();
    expect(getByTestId('email-field')).toBeInTheDocument();
    expect(getByTestId('bio-field')).toBeInTheDocument();
    expect(getByTestId('preferences-field')).toBeInTheDocument();
  })

  // it("should render the profile form with the user's information", () => {
  //   const {getByTestId} = renderProfilePage(authTokens);
  //   expect(getByTestId('username-field').value).toBe('test');
  //   expect(getByTestId('first-name-field').value).toBe('test');
  //   expect(getByTestId('last-name-field').value).toBe('test');
  //   expect(getByTestId('email-field').value).toBe('email');
  //   expect(getByTestId('bio-field').value).toBe('bio');
  //   expect(getByTestId('preferences-field').value).toBe('preferences');
  // })  

  // it("should update the user's information", async () => {
  //   const {getByText} = renderProfilePage(authTokens, user);
  //   const {getByTestId} = renderProfilePage(authTokens, user);
  //   const usernameField = getByTestId('username-field');
  //   const firstNameField = getByTestId('first-name-field');
  //   const lastNameField = getByTestId('last-name-field');
  //   const emailField = getByTestId('email-field');
  //   const bioField = getByTestId('bio-field');
  //   const preferencesField = getByTestId('preferences-field');
  //   const updateButton = getByText('save');
  //   const updatedUser = {
  //     username: 'test',
  //     firstName: 'test',
  //     lastName: 'test',
  //     email: 'test@test.test',
  //     bio: 'test',
  //     preferences: 'test',
  //   }
  //   mockFetchOnPrefilledTestFields(updatedUser);
  //   act(() => {
  //     fireEvent.change(usernameField, {target: {value: 'test'}})
  //     fireEvent.change(firstNameField, {target: {value: 'test'}})
  //     fireEvent.change(lastNameField, {target: {value: 'test'}})
  //     fireEvent.change(emailField, {target: {value: 'test'}})
  //     fireEvent.change(bioField, {target: {value: 'test'}})
  //     fireEvent.change(preferencesField, {target: {value: 'test'}})
  //     fireEvent.click(updateButton)
  //   })
  //   expect(getByTestId('username-field').value).toBe('test');
  //   expect(getByTestId('first-name-field').value).toBe('test');
  //   expect(getByTestId('last-name-field').value).toBe('test');
  //   expect(getByTestId('email-field').value).toBe('test');
  //   expect(getByTestId('bio-field').value).toBe('test');
  //   expect(getByTestId('preferences-field').value).toBe('test');
  // })
  

    
}); 