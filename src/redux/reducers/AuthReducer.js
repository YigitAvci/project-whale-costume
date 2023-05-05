import initialState from "./InitialState";
import * as actionTypes from "./../actions/ActionTypes"

export default function authReducer(state = initialState.authToken, action) {
    switch(action.type) {
        case actionTypes.UPDATE_AUTH_TOKEN:
            return action.authToken

        default:
            return state
    }
}