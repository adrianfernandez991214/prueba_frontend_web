import { types } from "../types/types";

//El estado inicial que va a contar con una variable checking para saber cuando se esta
//chequeando las credenciales de los usuario, el id del usuario, nombre y rol, y la pagina
//pagina actual donde de encuetra el usuario
const initialState = {
    checking: true,
    uid: null,
    nombre: null,
    rol: null,
    paginaActual: ''
}

//reducer encargado de las acciones refentes a la seguridad
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