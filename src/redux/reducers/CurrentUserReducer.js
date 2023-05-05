import initialState from "./InitialState";
import * as actionTypes from "../actions/ActionTypes"

export default function currentUserReducer(state = initialState.currentUser, action) {
    switch(action.type) {
        case actionTypes.UPDATE_CURRENT_USER:
            return action.currentUser

        default:
            return state
    }
}