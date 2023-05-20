import { types } from "../types/types";

const initialState = {
    libros: [],
    activelibro: null,
    modalCrear: false,
    modalEditar: false,
}

export const libro_Reducer = (state = initialState, action) => {

    switch (action.type) {
        case types.libroGetLosMios:
            return {
                ...state,
                libros: [...action.payloand]
            }
        case types.libroSelect:
            return {
                ...state,
                activelibro: state.libros.find(
                    e => (e._id === action.payloand)
                )
            }
        case types.libroPost:
            return {
                ...state,
                libros: [...state.libros, action.payloand]
            }
        case types.libroModalCrearOpen:
            return {
                ...state,
                modalCrear: true
            }
        case types.libroModalCrearCloced:
            return {
                ...state,
                modalCrear: false
            }
        case types.libroModalEditarOpen:
            return {
                ...state,
                modalEditar: true
            }
        case types.libroModalEditarCloced:
            return {
                ...state,
                modalEditar: false
            }
        case types.libroPut:
            return {
                ...state,
                libros: state.libros.map(
                    e => (e._id === action.payloand._id) ? action.payloand : e
                )
            }
        case types.libroDelete:
            return {
                ...state,
                libros: state.libros.filter(
                    e => (e._id !== action.payloand)
                )
            }
        default:
            return state;
    }

}