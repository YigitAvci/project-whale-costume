import * as actionTypes from "./ActionTypes"

export const updateSessionState = (isLoggedIn) => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_SESSION_STATE,
        isLoggedIn: isLoggedIn
    })
}