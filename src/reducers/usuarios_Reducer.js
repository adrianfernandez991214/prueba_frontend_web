import { types } from "../types/types";

const initialState = {
    usuarios: [],
    activeUser: null,
    modalEditar: false,
}

export const usuarios_Reducer = (state = initialState, action) => {

    switch (action.type) {
        case types.User_Get:
            return {
                ...state,
                usuarios: [...action.payloand]
            }
        case types.User_Delete:
            return {
                ...state,
                usuarios: state.usuarios.map(
                    e => (e._id === action.payloand) ? { ...e , estado: false} : e
                )
            }
        case types.User_ModalEditarOpen:
            return {
                ...state,
                modalEditar: true
            }
        case types.User_ModalEditarCloced:
            return {
                ...state,
                modalEditar: false
            }
        case types.User_select:
            return {
                ...state,
                activeUser: state.usuarios.find(
                    e => (e._id === action.payloand)
                )
            }
        case types.User_PUT:
            return {
                ...state,
                usuarios: state.usuarios.map(
                    e => (e._id === action.payloand._id) ? action.payloand : e
                )
            }
        default:
            return state;
    }

}