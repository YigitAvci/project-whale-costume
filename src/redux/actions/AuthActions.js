import * as actionTypes from "./ActionTypes"

export const updateAuthToken = (token) => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_AUTH_TOKEN,
        authToken: token
    })
}
