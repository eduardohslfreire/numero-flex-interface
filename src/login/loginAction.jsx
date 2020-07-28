export function get() {
    return {
        type: 'GET_TOKEN',
        payload: ''
    }
}

export function getToken() {
    return dispatch => {
        dispatch(get())
    }
}

export function set(data) {
    return {
        type: 'SET_TOKEN',
        payload: data
    }
}

export function setToken(data) {
    return dispatch => {
        dispatch(set(data))
    }
}

export function logout() {
    const data = {token : false}
    return dispatch => {
        dispatch(set(data))
    }
}