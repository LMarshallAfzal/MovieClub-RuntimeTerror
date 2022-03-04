import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
} from '../actions/types';

const initialState = {
    isAuthenticated: null
};

export default function auth1(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                username: ""
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }    
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case REGISTER_FAIL:    
            return state
        default:
            return state
    }
};
