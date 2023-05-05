import initialState from "./InitialState";
import * as actionTypes from "./../actions/ActionTypes"

export default function sessionReducer(state = initialState.isLoggedIn, action) {
    switch(action.type) {
        case actionTypes.UPDATE_SESSION_STATE:
            return action.isLoggedIn

        default:
            return state
    }
}