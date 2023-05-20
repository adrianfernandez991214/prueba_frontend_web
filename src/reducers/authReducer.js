import { types } from "../types/types";

const initialState = {
    checking: true,
    uid: null,
    nombre: null,
    rol: null,
    paginaActual: ''
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payloand,
                checking: false,
            }

        case types.authpaginaActula:
            return {
                ...state,
                paginaActual: action.payloand
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }

        default:
            return state;
    }
}