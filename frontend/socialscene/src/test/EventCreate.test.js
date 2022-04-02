import React from 'react';
import { render, fireEvent, screen, waitForNextUpdate } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EventCreate from "../components/EventCreate";
import { MemoryRouter } from 'react-router-dom'
import AuthContext from "../components/helper/AuthContext";



const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("EventCreate", () => {
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
    let createMeeting
    let user;
    beforeEach(() => {
        createMeeting = jest.fn();
        jest.spyOn(window, 'fetch');
        authTokens = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
        }
        render(
            <AuthContext.Provider value={{setMeetingData:jest.fn(),authTokens}}>
                <MemoryRouter>
                    <EventCreate/>
                </MemoryRouter>
            </AuthContext.Provider>

        )
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();

    });
    it("should render the create meeting component correctly", () => {
        expect(screen.getByTestId("meeting-title-input")).toBeTruthy()
        expect(screen.queryByPlaceholderText("event title")).toBeTruthy()
        expect(screen.getByTestId("meeting-description-input")).toBeTruthy()
        expect(screen.queryByPlaceholderText("short event description")).toBeTruthy()
        expect(screen.getByTestId("meeting-date-input")).toBeTruthy()
        expect(screen.getByTestId("meeting-start-time-input")).toBeTruthy()
        expect(screen.getByTestId("meeting-end-time-input")).toBeTruthy()
        expect(screen.getByTestId("meeting-movie-input")).toBeTruthy()
        expect(screen.getByTestId("meeting-link-input")).toBeTruthy()
    })

    it("should render the create meeting component with correct buttons", () => {
        const createButton = screen.getByText("create")
        expect(createButton).toBeInTheDocument()
    })

    it("should display correct error message for blank text fields", async () => {
        window.fetch.mockReturnValue(
            responseError(469, {
                meeting_title: "Error text...",
                meeting_description: "Error text...",
                meeting_date: "Error text...",
                meeting_start_time: "Error text...",
                meeting_end_time: "Error text...",
                meeting_movie: "Error text...",
                meeting_link: "Error text...",
            })

        );

        const createButton = screen.getByText("create");
        await userEvent.click(createButton);
        await Promise.resolve().then();
        await waitForNextUpdate;
    });


    it("should create event with no errors when given valid input", async () => {
        const createButton = screen.getByText("create")
        const meetingTitle = screen.getByTestId("meeting-title-input").querySelector('input')
        const meetingDescription = screen.getByTestId("meeting-description-input").querySelector('input')
        const meetingDate = screen.getByTestId("meeting-date-input").querySelector('input')
        const meetingStartTime = screen.getByTestId("meeting-start-time-input").querySelector('input')
        const meetingEndTime = screen.getByTestId("meeting-end-time-input").querySelector('input')
        const meetingMovie = screen.getByTestId("meeting-movie-input").querySelector('input')
        const meetingLink = screen.getByTestId("meeting-link-input").querySelector('input')
        fireEvent.change(meetingTitle, { target: { value: "test title" } });
        fireEvent.change(meetingDescription, { target: { value: "test description" } });
        fireEvent.change(meetingDate, { target: { value: "2020-01-01" } });
        fireEvent.change(meetingStartTime, { target: { value: "12:00" } });
        fireEvent.change(meetingEndTime, { target: { value: "13:00" } });
        fireEvent.change(meetingMovie, { target: { value: 5 } });
        fireEvent.change(meetingLink, { target: { value: "test link" } });

        createMeeting.mockReturnValue(responseOK(200, {}));
        createButton.onclick()
        await Promise.resolve().then();
        await waitForNextUpdate;
    });

});