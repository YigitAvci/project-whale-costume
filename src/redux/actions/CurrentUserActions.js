import * as actionTypes from "./ActionTypes"

export const updateUser = (currentUser) => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_CURRENT_USER,
        currentUser: currentUser
    })
}