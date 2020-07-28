const INITIAL_STATE = {token: { token: false }}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
                return { ...state, token: action.payload }
        case 'GET_TOKEN':
                return state
        default:
            return state
    }
}