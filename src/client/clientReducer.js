import _concat from 'lodash.concat'
import {
    CLIENT_FETCHED,
    CHANGE_MENU_TREEFORM,
    SAVE_TREE,
    TREE_FETCHED,
    SET_ID
} from './actionTypes'


const INITIAL_STATE = { list: [], treeClient: {}, idCliente : null }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLIENT_FETCHED:
            return { ...state, list: action.payload, idCliente: action.payload.idCliente }
        case CHANGE_MENU_TREEFORM: {
            return { ...state, menuVisible: action.payload }
        }
        case TREE_FETCHED:
            return { ...state, treeClient: action.payload }
        case SET_ID:
                return { ...state, id: action.payload }
        default:
            return state
    }
}