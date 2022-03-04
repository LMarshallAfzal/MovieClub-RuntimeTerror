
import {
    LOAD_USER_ACCOUNT_SUCCESS,
    LOAD_USER_ACCOUNT_FAIL,
} from "../actions/types";

const initialState = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    preferences: ""
};

export default function foo(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOAD_USER_ACCOUNT_SUCCESS:
            return {
                ...state,
                username: payload.username,
                first_name: payload.profile.first_name,
                last_name: payload.profile.last_name,
                email: payload.profile.email,
                bio: payload.profile.bio,
                preferences: payload.profile.preferences
            }
        case LOAD_USER_ACCOUNT_FAIL:
            return {
                ...state,
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                bio: "",
                preferences: ""
            }
        default:
            return state
    }
};
